// Mengambil data dari global scope (data.js)
// Termasuk: heroSlides, products, testimonials


let currentTestimonialSlide = 0;

function renderTestimonials() {
    const testimonialTrack = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testiPrevBtn');
    const nextBtn = document.getElementById('testiNextBtn');

    if (!testimonialTrack) return;

    testimonialTrack.innerHTML = testimonials.map(item => `
        <div class="testimonial-card">
            <div class="testimonial-header">
                <img src="${item.image}" alt="${item.name}" class="testimonial-avatar">
                <div>
                    <h4 class="testimonial-name">${item.name}</h4>
                    <span class="testimonial-role">${item.role}</span>
                </div>
            </div>
            <div class="testimonial-rating">
                ${Array(item.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
            </div>
            <p class="testimonial-text">"${item.text}"</p>
        </div>
    `).join('');

    // Event Listeners for Nav
    prevBtn.addEventListener('click', () => {
        moveTestimonialSlide(-1);
    });

    nextBtn.addEventListener('click', () => {
        moveTestimonialSlide(1);
    });

    // Resize listener to reset position if screen size changes
    window.addEventListener('resize', updateTestimonialPosition);
}

function moveTestimonialSlide(direction) {
    const totalSlides = testimonials.length;
    let cardsPerView = 1;

    if (window.innerWidth >= 1024) cardsPerView = 3;
    else if (window.innerWidth >= 768) cardsPerView = 2;

    const maxSlide = totalSlides - cardsPerView;

    // Boundary Check
    if (direction === 1 && currentTestimonialSlide >= maxSlide) {
        currentTestimonialSlide = 0; // Loop back to start
    } else if (direction === -1 && currentTestimonialSlide <= 0) {
        currentTestimonialSlide = maxSlide; // Loop to end
    } else {
        currentTestimonialSlide += direction;
    }

    updateTestimonialPosition();
}

function updateTestimonialPosition() {
    const track = document.getElementById('testimonialTrack');
    let cardWidth = 100; // Percentage

    if (window.innerWidth >= 1024) cardWidth = 33.333;
    else if (window.innerWidth >= 768) cardWidth = 50;

    track.style.transform = `translateX(-${currentTestimonialSlide * cardWidth}%)`;
}



/**
 * State & Variabel Global
 * Menyimpan status aplikasi seperti keranjang, wishlist, dan bahasa.
 */
let cart = JSON.parse(localStorage.getItem('bazon_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('bazon_wishlist')) || [];
let activeCoupon = null;
let currentVariant = {}; // Menyimpan varian yang dipilih user
let currentLang = localStorage.getItem('bazon_lang') || 'id'; // Bahasa default

// --- Referensi Elemen DOM ---
const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const productModal = document.getElementById('productModal');
const closeProductModal = document.getElementById('closeProductModal');
const modalProductImage = document.getElementById('modalProductImage');
const modalProductCategory = document.getElementById('modalProductCategory');
const modalProductTitle = document.getElementById('modalProductTitle');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductDesc = document.getElementById('modalProductDesc');
const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');

const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartCountElement = document.getElementById('cartCount');
const cartSummary = document.getElementById('cartSummary');
const checkoutBtn = document.getElementById('checkoutBtn');

// --- Elemen Kupon ---
const couponInput = document.getElementById('couponInput');
const applyCouponBtn = document.getElementById('applyCouponBtn');
const removeCouponBtn = document.getElementById('removeCouponBtn');

// --- Fungsi Bantuan (Helpers) ---
const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
};

function saveCart() {
    localStorage.setItem('bazon_cart', JSON.stringify(cart));
    cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// --- Logika "Muat Lebih Banyak" ---
let currentProductLimit = config.maxProducts || 8;
const loadMoreContainer = document.getElementById('loadMoreContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        currentProductLimit += 4; // Load 4 more
        renderProducts(activeCategory, searchInput ? searchInput.value : '');
    });
}

// --- Fungsi Render (Tampilan) ---
function renderProducts(category = 'all', searchTerm = '') {
    // Keep track of active category for Load More
    activeCategory = category;

    let filteredProducts = [...products]; // Create copy

    // Filter by Category
    if (category === 'favorites') {
        filteredProducts = filteredProducts.filter(p => wishlist.includes(p.id));
    } else if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // Filter by Search Term
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );
    }

    // Sort Products
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        const sortMethod = sortSelect.value;
        if (sortMethod === 'price_asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortMethod === 'price_desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortMethod === 'name_asc') {
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    const totalFiltered = filteredProducts.length;

    // Limit Products (apply limit only if we are in 'all' or specific categories where pagination is desired)
    // We apply pagination generally now if limit > 0
    if (currentProductLimit > 0) {
        filteredProducts = filteredProducts.slice(0, currentProductLimit);
    }

    // Manage Load More Button Visibility
    if (loadMoreContainer) {
        if (filteredProducts.length < totalFiltered) {
            loadMoreContainer.style.display = 'block';
        } else {
            loadMoreContainer.style.display = 'none';
        }
    }

    productGrid.innerHTML = filteredProducts.map(product => {
        const isWishlist = wishlist.includes(product.id);
        const hasDiscount = product.originalPrice && product.originalPrice > product.price;
        const hasBadge = !!product.badge;

        let badgeHtml = '';

        // Logika Badge: Bergantian jika ada diskon & badge, statis jika cuma satu
        if (hasDiscount && hasBadge) {
            const badgeLabel = product.badge === 'best-seller' ? translations[currentLang].products.badges.best_seller : translations[currentLang].products.badges.limited_stock;
            badgeHtml = `
                <div class="sale-badge badge-anim-1">${translations[currentLang].products.badges.sale}</div>
                <div class="product-badge ${product.badge} badge-anim-2">${badgeLabel}</div>
             `;
        } else if (hasDiscount) {
            badgeHtml = `<div class="sale-badge">${translations[currentLang].products.badges.sale}</div>`;
        } else if (hasBadge) {
            const badgeLabel = product.badge === 'best-seller' ? translations[currentLang].products.badges.best_seller : translations[currentLang].products.badges.limited_stock;
            badgeHtml = `<div class="product-badge ${product.badge}">${badgeLabel}</div>`;
        }

        return `
        <div class="product-card">
            ${badgeHtml}
            <button class="btn-wishlist ${isWishlist ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
                <i class="fa-${isWishlist ? 'solid' : 'regular'} fa-heart"></i>
            </button>
            <div class="product-image-container">
                <img src="${product.image}" loading="lazy" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                
                <div class="product-price-container">
                    ${hasDiscount ? `<div class="original-price">${formatPrice(product.originalPrice)}</div>` : ''}
                    <div class="current-price ${hasDiscount ? 'discounted' : ''}">${formatPrice(product.price)}</div>
                </div>

                <div class="product-action-buttons">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i> <span data-i18n="modal.add_to_cart">${translations[currentLang].modal.add_to_cart}</span>
                    </button>
                    <button class="btn-secondary" onclick="openProductModal(${product.id})" style="margin-top: 10px; width: 100%;">
                        Detail
                    </button>
                </div>
            </div>
        </div>
    `;
    }).join('');
}
function renderCart() {
    cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-message">Keranjang Anda kosong</div>';
        cartSummary.innerHTML = `
            <span>Total:</span>
            <span>${formatPrice(0)}</span>
        `;
        return;
    }

    // Render Items
    cartItemsContainer.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        const currentPrice = item.price || product.price;

        // Variant Text
        let variantText = '';
        if (item.variants) {
            const parts = [];
            if (item.variants.size) parts.push(`Size: ${item.variants.size}`);
            if (item.variants.color) parts.push(`Color: ${item.variants.color}`);
            if (item.variants.flavor) parts.push(`Rasa: ${item.variants.flavor}`);
            variantText = parts.length > 0 ? `<div class="cart-variant-info">${parts.join(', ')}</div>` : '';
        }

        // We need a unique composite ID for removing items from cart
        const cartItemId = item.cartId || item.id; // Backward compatibility

        return `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${product.name}</div>
                    ${variantText}
                    <div class="cart-item-price">${formatPrice(currentPrice)}</div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="btn-qty" onclick="updateQuantity('${cartItemId}', -1)"><i class="fa-solid fa-minus"></i></button>
                            <span>${item.quantity}</span>
                            <button class="btn-qty" onclick="updateQuantity('${cartItemId}', 1)"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <button class="btn-remove" onclick="removeFromCart('${cartItemId}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Calculate Totals using stored price or product price
    let total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        const price = item.price || product.price;
        return sum + (price * item.quantity);
    }, 0);

    let discountAmount = 0;
    if (activeCoupon) {
        if (activeCoupon.type === 'percent') {
            discountAmount = total * (activeCoupon.value / 100);
        } else if (activeCoupon.type === 'fixed') {
            discountAmount = activeCoupon.value;
        }
    }

    if (discountAmount > total) discountAmount = total;
    const grandTotal = total - discountAmount;

    cartSummary.innerHTML = `
        <div class="cart-subtotal">
            <span>${translations[currentLang].cart.subtotal}</span>
            <span>${formatPrice(total)}</span>
        </div>
        ${activeCoupon ? `
        <div class="cart-discount">
            <span>${translations[currentLang].cart.discount} (${activeCoupon.code})</span>
            <span>- ${formatPrice(discountAmount)}</span>
        </div>
        ` : ''}
        <div class="cart-grand-total">
            <span>${translations[currentLang].cart.total}</span>
            <span>${formatPrice(grandTotal)}</span>
        </div>
    `;

    // Manage Coupon UI State
    if (activeCoupon) {
        couponInput.value = activeCoupon.code;
        couponInput.disabled = true;
        applyCouponBtn.classList.add('hidden');
        removeCouponBtn.classList.remove('hidden');
    } else {
        couponInput.value = '';
        couponInput.disabled = false;
        applyCouponBtn.classList.remove('hidden');
        removeCouponBtn.classList.add('hidden');
    }
}

// --- Logika Tambah ke Keranjang ---
window.addToCart = (productId, fromModal = false) => {
    const product = products.find(p => p.id === productId);

    // If adding from grid, and product has variants, open modal instead
    if (!fromModal && product.variants && (product.variants.sizes || product.variants.colors)) {
        openProductModal(productId);
        showToast(translations[currentLang].toast.select_variant, 'info');
        return;
    }

    // Identify Cart Item ID (Composite for variants)
    let cartItem = {
        id: productId,
        quantity: 1,
        variants: fromModal ? { ...currentVariant } : {},
        price: (fromModal && currentVariant.selectedPrice) ? currentVariant.selectedPrice : product.price
    };

    // Generate a unique ID for the cart item based on product ID + variants
    // Simple hash: id-size-color
    const variantKey = Object.values(cartItem.variants).join('-');
    cartItem.cartId = `${productId}-${variantKey}`;

    const existingItem = cart.find(item => item.cartId === cartItem.cartId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(cartItem);
    }

    saveCart();
    renderCart();

    showToast(translations[currentLang].toast.added_to_cart, 'success');
};

window.updateQuantity = (cartItemId, change) => {
    // Note: cartItemId is now string for variants
    const item = cart.find(item => item.cartId == cartItemId || (item.id == cartItemId && !item.cartId));
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(cartItemId);
    } else {
        saveCart();
        renderCart();
    }
};

window.removeFromCart = (cartItemId) => {
    cart = cart.filter(item => item.cartId != cartItemId && item.id != cartItemId);
    saveCart();
    renderCart();
    showToast(translations[currentLang].toast.removed_from_cart, 'error');
};


// --- Modal Checkout & Auto-fill Alamat ---
function openCheckoutModal() {
    if (cart.length === 0) {
        showToast(translations[currentLang].cart.empty, 'error');
        return;
    }
    cartModal.classList.remove('active');
    checkoutModal.classList.add('active');

    // Auto-fill address
    const savedData = localStorage.getItem('bazon_user_data');
    if (savedData) {
        const userData = JSON.parse(savedData);
        if (userData.name) document.getElementById('customerName').value = userData.name;
        if (userData.phone) document.getElementById('customerPhone').value = userData.phone;
        if (userData.address) document.getElementById('customerAddress').value = userData.address;
    }

    // Check if checkbox exists, if not create it
    const form = document.getElementById('checkoutForm');
    if (!document.getElementById('saveAddressCheckbox')) {
        const checkboxGroup = document.createElement('div');
        checkboxGroup.className = 'save-address-group';
        checkboxGroup.innerHTML = `
            <input type="checkbox" id="saveAddressCheckbox" checked>
            <input type="checkbox" id="saveAddressCheckbox" checked>
            <label for="saveAddressCheckbox">${translations[currentLang].checkout.save_address}</label>
         `;
        // Insert before submit button (last element)
        form.insertBefore(checkboxGroup, form.lastElementChild);
    }
}

window.processOrder = () => {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    const payment = document.getElementById('paymentMethod').value;
    const shouldSave = document.getElementById('saveAddressCheckbox')?.checked;

    if (!name || !phone || !address) {
        showToast(translations[currentLang].toast.fill_data, 'error');
        return;
    }

    // Save Data if requested
    if (shouldSave) {
        const userData = { name, phone, address };
        localStorage.setItem('bazon_user_data', JSON.stringify(userData));
    }

    const br = '%0A';
    let message = `Halo Admin, saya ingin memesan:${br}${br}`;
    let total = 0;

    cart.forEach((item, index) => {
        const product = products.find(p => p.id === item.id);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        let variantInfo = '';
        if (item.variants) {
            const parts = [];
            if (item.variants.size) parts.push(`Size: ${item.variants.size}`);
            if (item.variants.color) parts.push(`Color: ${item.variants.color}`);
            if (parts.length > 0) variantInfo = ` (${parts.join(', ')})`;
        }

        message += `${index + 1}. ${product.name}${variantInfo} (x${item.quantity}) - ${formatPrice(itemTotal)}${br}`;
    });

    message += `${br}Total: *${formatPrice(total)}*${br}`;

    if (activeCoupon) {
        let discountAmount = 0;
        if (activeCoupon.type === 'percent') {
            discountAmount = total * (activeCoupon.value / 100);
        } else {
            discountAmount = activeCoupon.value;
        }
        if (discountAmount > total) discountAmount = total;

        message += `Diskon (${activeCoupon.code}): -${formatPrice(discountAmount)}${br}`;
        message += `*Grand Total: ${formatPrice(total - discountAmount)}*${br}${br}`;
    } else {
        message += `${br}`;
    }
    message += `📋 Data Pemesan:${br}`;
    message += `Nama: ${name}${br}`;
    message += `No. HP: ${phone}${br}`;
    message += `Alamat: ${address}${br}`;
    message += `Pembayaran: ${payment}${br}`;
    message += `${br}Mohon diproses. Terima kasih!`;

    const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    showToast(translations[currentLang].toast.redirecting, 'success');
};


// --- Logika Modal Produk ---
window.openProductModal = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    // Reset current variant
    currentVariant = {};

    modalProductImage.src = product.image;
    modalProductCategory.textContent = product.category;
    modalProductTitle.textContent = product.name;
    modalProductPrice.textContent = formatPrice(product.price);
    modalProductDesc.textContent = product.description;

    // ... (Rating logic same) ...
    const starCount = Math.round(product.rating || 0);
    const starHtml = Array(5).fill(0).map((_, i) =>
        `<i class="fa-${i < starCount ? 'solid' : 'regular'} fa-star"></i>`
    ).join('');

    document.getElementById('modalProductRating').innerHTML = `
        ${starHtml}
        <span>(${product.reviews || 0} Ulasan)</span>
    `;

    // ... (Stock logic same) ...
    const stockElem = document.getElementById('modalProductStock');
    if (product.stock > 0) {
        stockElem.textContent = `${translations[currentLang].modal.stock} ${product.stock} ${translations[currentLang].modal.stock_available}`;
        stockElem.classList.remove('low');
        stockElem.style.display = 'block';
        if (product.stock < 10) stockElem.classList.add('low');
    } else {
        stockElem.textContent = translations[currentLang].modal.stock_empty;
        stockElem.classList.add('low');
    }

    // Render Variants
    const variantsContainer = document.getElementById('modalVariants');
    variantsContainer.innerHTML = ''; // Clear previous

    if (product.variants) {
        // Sizes (or Types)
        if (product.variants.sizes && product.variants.sizes.length > 0) {
            const sizeGroup = document.createElement('div');
            sizeGroup.className = 'variant-group';
            sizeGroup.innerHTML = `
                <span class="variant-label">${translations[currentLang].modal.variant_size}</span>
                <div class="variant-options" id="sizeOptions">
                    ${product.variants.sizes.map(size => {
                const isObject = typeof size === 'object';
                const val = isObject ? size.name : size;
                const price = isObject ? size.price : null;
                const priceAttr = price ? `, ${price}` : '';
                return `<button class="variant-btn" onclick="selectVariant('size', '${val}', this${priceAttr})">${val}</button>`;
            }).join('')}
                </div>
             `;
            variantsContainer.appendChild(sizeGroup);
        }

        // Colors
        if (product.variants.colors && product.variants.colors.length > 0) {
            const colorGroup = document.createElement('div');
            colorGroup.className = 'variant-group';
            colorGroup.innerHTML = `
                <span class="variant-label">${translations[currentLang].modal.variant_color}</span>
                <div class="variant-options" id="colorOptions">
                    ${product.variants.colors.map(color => {
                const isObject = typeof color === 'object';
                const val = isObject ? color.name : color;
                const price = isObject ? color.price : null;
                const priceAttr = price ? `, ${price}` : '';
                return `<button class="variant-btn" onclick="selectVariant('color', '${val}', this${priceAttr})">${val}</button>`;
            }).join('')}
                </div>
             `;
            variantsContainer.appendChild(colorGroup);
        }

        // Flavors
        if (product.variants.flavors && product.variants.flavors.length > 0) {
            const flavorGroup = document.createElement('div');
            flavorGroup.className = 'variant-group';
            flavorGroup.innerHTML = `
                <span class="variant-label">${translations[currentLang].modal.variant_flavor}</span>
                <div class="variant-options" id="flavorOptions">
                    ${product.variants.flavors.map(flavor => {
                const isObject = typeof flavor === 'object';
                const val = isObject ? flavor.name : flavor;
                const price = isObject ? flavor.price : null;
                const priceAttr = price ? `, ${price}` : '';
                return `<button class="variant-btn" onclick="selectVariant('flavor', '${val}', this${priceAttr})">${val}</button>`;
            }).join('')}
                </div>
             `;
            variantsContainer.appendChild(flavorGroup);
        }
    }

    // Spec logic same
    const specsList = document.getElementById('modalProductSpecs');
    if (product.specs && product.specs.length > 0) {
        specsList.innerHTML = product.specs.map(spec => `<li>${spec}</li>`).join('');
        document.querySelector('.modal-specs-container').style.display = 'block';
    } else {
        document.querySelector('.modal-specs-container').style.display = 'none';
    }

    // Update Add to Cart button
    modalAddToCartBtn.onclick = () => {
        // Validate Variants
        if (product.variants) {
            if (product.variants.sizes && !currentVariant.size) {
                showToast('Pilih ukuran terlebih dahulu!', 'error');
                return;
            }
            if (product.variants.colors && !currentVariant.color) {
                showToast('Pilih warna terlebih dahulu!', 'error');
                return;
            }
            if (product.variants.flavors && !currentVariant.flavor) {
                showToast('Pilih rasa terlebih dahulu!', 'error');
                return;
            }
        }
        addToCart(product.id, true);
        productModal.classList.remove('active');
    };

    // ... (Share Logic same) ...
    const shareText = `Cek produk keren ini: ${product.name} - ${formatPrice(product.price)} di Baz-On Store!`;
    const shareUrl = window.location.href.split('#')[0]; // Clean URL

    document.getElementById('shareWa').onclick = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    };

    document.getElementById('shareTw').onclick = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    document.getElementById('shareCopy').onclick = () => {
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
            showToast('Link berhasil disalin!', 'success');
        });
    };

    productModal.classList.add('active');
};


// --- Helper Pemilihan Varian ---
window.selectVariant = (type, value, btnElement, price = null) => {
    // Update State
    currentVariant[type] = value;
    if (price) {
        currentVariant.selectedPrice = price;
        // Update Modal Price display
        modalProductPrice.textContent = formatPrice(price);
    }

    // Update UI
    // Find parent group and remove active from all siblings
    const parent = btnElement.parentElement;
    const siblings = parent.querySelectorAll('.variant-btn');
    siblings.forEach(el => el.classList.remove('active'));

    // Add active to clicked
    btnElement.classList.add('active');
};



window.applyCoupon = () => {
    const code = couponInput.value.trim().toUpperCase();
    if (!code) {
        showToast(translations[currentLang].toast.coupon_invalid, 'error');
        return;
    }

    // Find coupon in config
    const coupon = config.coupons.find(c => c.code === code);

    if (coupon) {
        activeCoupon = coupon;
        showToast(translations[currentLang].toast.coupon_applied, 'success');
    } else {
        showToast(translations[currentLang].toast.coupon_invalid, 'error');
        return;
    }

    renderCart();
};

window.removeCoupon = () => {
    activeCoupon = null;
    couponInput.value = '';
    showToast(translations[currentLang].toast.coupon_removed, 'success');
    renderCart();
};

// event listener untuk kode promo
if (applyCouponBtn) applyCouponBtn.addEventListener('click', applyCoupon);
if (removeCouponBtn) removeCouponBtn.addEventListener('click', removeCoupon);

let activeCategory = 'all';

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');

        // Filter
        activeCategory = btn.dataset.category;
        currentProductLimit = config.maxProducts || 8; // Reset Pagination
        renderProducts(activeCategory, searchInput.value);
    });
});

// event listener untuk pencarian
searchInput.addEventListener('input', (e) => {
    currentProductLimit = config.maxProducts || 8; // Reset Pagination
    renderProducts(activeCategory, e.target.value);
});

// --- Logika Slider / Banner ---
let currentSlide = 0;
let slideInterval;

function initSlider() {
    const sliderWrapper = document.getElementById('sliderWrapper');
    const sliderDots = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!sliderWrapper) return; // Guard clause

    // Render Slides
    sliderWrapper.innerHTML = heroSlides.map((slide, index) => `
        <div class="slide ${index === 0 ? 'active' : ''}" style="min-width: 100%;">
            <div class="slide-content">
                <div class="slide-text">
                    <h1>${slide.title}</h1>
                    <p>${slide.description}</p>
                    <a href="${slide.link}" class="btn-primary">${slide.cta}</a>
                </div>
                <div class="slide-image-wrapper">
                    <img src="${slide.image}" alt="Slide Image" class="slide-image">
                </div>
            </div>
        </div>
    `).join('');

    // Render Dots
    sliderDots.innerHTML = heroSlides.map((_, index) => `
        <div class="dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></div>
    `).join('');

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    // Start AutoPlay
    startAutoPlay();
}

function updateSlider() {
    const sliderWrapper = document.getElementById('sliderWrapper');
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.slide');

    // Update Slider Position
    sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update Dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    // Update Active Class for Animations
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
}

window.goToSlide = (index) => {
    currentSlide = index;
    updateSlider();
    resetAutoPlay();
};

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    updateSlider();
}

function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function resetAutoPlay() {
    clearInterval(slideInterval);
    startAutoPlay();
}

// --- Inisialisasi Awal ---
document.addEventListener('DOMContentLoaded', () => {
    initLanguage(); // Initialize Language First
    initSlider(); // Initialize Slider
    initFlashSale(); // Initialize Flash Sale
    initTheme(); // Initialize Theme
    renderProducts();
    renderCart();
    renderTestimonials();
});

// --- Logika Bahasa (Internationalization) ---
function initLanguage() {
    const langToggle = document.getElementById('langToggle');
    updateLanguage(currentLang); // Apply initial language

    if (langToggle) {
        langToggle.textContent = currentLang.toUpperCase();
        langToggle.addEventListener('click', () => {
            // Toggle Logic
            currentLang = currentLang === 'id' ? 'en' : 'id';
            localStorage.setItem('bazon_lang', currentLang);
            langToggle.textContent = currentLang.toUpperCase();
            updateLanguage(currentLang);
        });
    }
}

function updateLanguage(lang) {
    // 1. Update HTML Data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = key.split('.').reduce((obj, k) => obj && obj[k], translations[lang]);
        if (text) el.textContent = text;
    });

    // 2. Update Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const text = key.split('.').reduce((obj, k) => obj && obj[k], translations[lang]);
        if (text) el.placeholder = text;
    });

    // 3. Update HTML Lang Attribute
    document.documentElement.lang = lang;

    // 4. Re-render dynamic components to reflect text changes
    renderCart();
    renderProducts(activeCategory, searchInput.value);
    // renderTestimonials(); // Testimonials are mostly static data, but title is handled by data-i18n
}

// --- Logika Tema (Dark/Light Mode) ---
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('bazon_theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(icon, savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('bazon_theme', newTheme);
        updateThemeIcon(icon, newTheme);
    });
}

function updateThemeIcon(icon, theme) {
    if (theme === 'light') {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
}

// --- Logika Install PWA ---
let deferredPrompt;

// Fungsi untuk menampilkan Alert Install
function showInstallAlert() {
    // Cek jika sudah pernah di-close sebelumnya (opsional, saat ini kita tampilkan terus jika bisa install)
    // if (localStorage.getItem('bazon_install_dismissed')) return;

    // Create Element
    const alertDiv = document.createElement('div');
    alertDiv.className = 'install-alert';
    alertDiv.innerHTML = `
        <div class="install-alert-content">
            <i class="fa-solid fa-download"></i>
            <span>Install Aplikasi Baz-On untuk pengalaman lebih baik!</span>
        </div>
        <div class="install-alert-actions">
            <button id="alertInstallBtn" class="btn-primary-sm">Install</button>
            <button id="alertCloseBtn" class="btn-text">Nanti</button>
        </div>
    `;

    document.body.appendChild(alertDiv);

    // Trigger Animation
    setTimeout(() => {
        alertDiv.classList.add('show');
    }, 100);

    // Event Listeners
    const installBtn = document.getElementById('alertInstallBtn');
    const closeBtn = document.getElementById('alertCloseBtn');

    if (installBtn) {
        installBtn.addEventListener('click', () => {
            // Hide the app provided install promotion
            alertDiv.classList.remove('show');
            setTimeout(() => { alertDiv.remove(); }, 400);

            // Show the install prompt
            if (deferredPrompt) {
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
                });
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            alertDiv.classList.remove('show');
            setTimeout(() => { alertDiv.remove(); }, 400);
            // Opsional: Simpan state bahwa usernya menolak sementara
            // localStorage.setItem('bazon_install_dismissed', 'true');
        });
    }
}

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    showInstallAlert();
});

window.addEventListener('appinstalled', () => {
    // Log install to analytics
    console.log('PWA was installed', 'appinstalled');
});

// Scroll to Top Logic
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Flash Sale Logic
function initFlashSale() {
    const flashSaleSection = document.getElementById('flashSale');

    // Check Config
    if (config.enableFlashSale === false) {
        if (flashSaleSection) {
            flashSaleSection.style.display = 'none';
        }
        return;
    }

    const hoursElem = document.getElementById('timerHours');
    const minutesElem = document.getElementById('timerMinutes');
    const secondsElem = document.getElementById('timerSeconds');

    // If elements don't exist, exit safely
    if (!hoursElem) return;

    // Set end time to midnight of next day, or a specific duration (e.g., 24 hours from now)
    let endTime = localStorage.getItem('bazon_flash_end');

    // Reset if not set or already passed
    if (!endTime || new Date().getTime() > parseInt(endTime)) {
        // Create new end time (24 hours from now)
        const date = new Date();
        date.setHours(date.getHours() + (config.flashSaleDurationHours || 24));
        endTime = date.getTime();
        localStorage.setItem('bazon_flash_end', endTime);
    }

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            // Expired
            if (hoursElem) hoursElem.innerText = "00";
            if (minutesElem) minutesElem.innerText = "00";
            if (secondsElem) secondsElem.innerText = "00";
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (hoursElem) hoursElem.innerText = hours < 10 ? `0${hours}` : hours;
        if (minutesElem) minutesElem.innerText = minutes < 10 ? `0${minutes}` : minutes;
        if (secondsElem) secondsElem.innerText = seconds < 10 ? `0${seconds}` : seconds;
    };

    updateTimer(); // Initial call
    setInterval(updateTimer, 1000); // 1 second interval
}

// Newsletter Logic
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value;

        if (email) {
            // Save to localStorage (Mock Database)
            const subscribers = JSON.parse(localStorage.getItem('bazon_subscribers')) || [];

            if (subscribers.includes(email)) {
                showToast('Email ini sudah terdaftar!', 'error');
            } else {
                subscribers.push(email);
                localStorage.setItem('bazon_subscribers', JSON.stringify(subscribers));
                showToast(currentLang === 'id' ? 'Terima kasih telah berlangganan!' : 'Thanks for subscribing!', 'success');
                emailInput.value = ''; // Reset
            }
        }
    });
}



// Product Modal Close Listeners
if (closeProductModal) {
    closeProductModal.addEventListener('click', () => {
        productModal.classList.remove('active');
    });
}

if (productModal) {
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
        }
    });

    // Also close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && productModal.classList.contains('active')) {
            productModal.classList.remove('active');
        }
    });
}

// Cart Modal Close Listeners (Verify these exist too)
if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
    });
}

if (closeCart) {
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });
}

if (cartModal) {
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
}

// Checkout Modal Close Listeners
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', openCheckoutModal);
}

if (closeCheckout) {
    closeCheckout.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
    });
}

if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            checkoutModal.classList.remove('active');
        }
    });
}

// Sort Listener
const sortSelect = document.getElementById('sortSelect');
if (sortSelect) {
    sortSelect.addEventListener('change', () => {
        // use activeCategory from global scope
        renderProducts(activeCategory, searchInput.value);
    });
}
