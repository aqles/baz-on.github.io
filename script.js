// Hero Slides Data
const heroSlides = [
    {
        id: 1,
        title: 'Temukan Gaya <span class="gradient-text">Premium</span> Anda',
        description: 'Koleksi eksklusif dengan kualitas terbaik untuk menunjang penampilan Anda.',
        image: 'images/jacket.png', // Using existing product image as hero
        cta: 'Belanja Sekarang',
        link: '#products'
    },
    {
        id: 2,
        title: 'Koleksi <span class="gradient-text">Jam Tangan</span> Mewah',
        description: 'Tampil lebih percaya diri dengan aksesoris pilihan yang elegan.',
        image: 'images/watch.png',
        cta: 'Lihat Koleksi',
        link: '#products'
    },
    {
        id: 3,
        title: 'Sneakers <span class="gradient-text">Terpopuler</span> Bulan Ini',
        description: 'Kenyamanan maksimal untuk setiap langkah Anda. Dapatkan sekarang!',
        image: 'images/sneakers.png',
        cta: 'Beli Sekarang',
        link: '#products'
    }
];

// Product Data
const products = [
    {
        id: 1,
        name: "Noir Executive Watch",
        price: 1500000,
        category: "Accessories",
        image: "images/watch.png",
        description: "Jam tangan premium dengan desain minimalis untuk eksekutif muda."
    },
    {
        id: 2,
        name: "Urban Leather Jacket",
        price: 850000,
        category: "Fashion",
        image: "images/jacket.png",
        description: "Jaket kulit sintetis premium, cocok untuk gaya urban casual."
    },
    {
        id: 3,
        name: "Midnight Sneakers",
        price: 650000,
        category: "Footwear",
        image: "images/sneakers.png",
        description: "Sneakers hitam elegan dengan kenyamanan maksimal untuk aktivitas harian."
    },
    {
        id: 4,
        name: "Heritage Backpack",
        price: 450000,
        category: "Bags",
        image: "images/backpack.png",
        description: "Tas punggung vintage dengan material kanvas tahan air."
    },
    {
        id: 5,
        name: "Audio Pro Headset",
        price: 2100000,
        category: "Electronics",
        image: "images/headset.png",
        description: "Headset noise-cancelling dengan kualitas suara studio."
    },
    {
        id: 6,
        name: "Slim Fit Chinos",
        price: 350000,
        category: "Fashion",
        image: "images/chinos.png",
        description: "Celana chinos nyaman dengan potongan slim fit modern."
    }
];

const testimonials = [
    {
        id: 1,
        name: "Budi Santoso",
        role: "Verified Buyer",
        text: "Kualitas jaketnya luar biasa! Bahannya tebal tapi adem dipakai. Pengiriman juga sangat cepat.",
        rating: 5,
        image: "https://ui-avatars.com/api/?name=Budi+Santoso&background=random"
    },
    {
        id: 2,
        name: "Siti Rahmawati",
        role: "Fashion Enthusiast",
        text: "Suka banget sama model jam tangannya. Elegan dan mewah, cocok buat dipakai ke kantor.",
        rating: 5,
        image: "https://ui-avatars.com/api/?name=Siti+Rahmawati&background=random"
    },
    {
        id: 3,
        name: "Andi Pratama",
        role: "Regular Customer",
        text: "Sneakers-nya nyaman banget dipakai seharian. Ukurannya pas dan sesuai deskripsi.",
        rating: 4,
        image: "https://ui-avatars.com/api/?name=Andi+Pratama&background=random"
    }
];


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

// Config
const WHATSAPP_NUMBER = "6281234567890"; // Ganti dengan nomor WhatsApp admin yang benar (format 62...)

// State
let cart = JSON.parse(localStorage.getItem('bazon_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('bazon_wishlist')) || [];

// DOM Elements
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
const cartTotalElement = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Helper Functions
const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
};

// Render Functions
function renderProducts(category = 'all', searchTerm = '') {
    let filteredProducts = products;

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

    productGrid.innerHTML = filteredProducts.map(product => {
        const isWishlist = wishlist.includes(product.id);
        return `
        <div class="product-card">
            <button class="btn-wishlist ${isWishlist ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
                <i class="fa-${isWishlist ? 'solid' : 'regular'} fa-heart"></i>
            </button>
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-cart-plus"></i> Tambah ke Keranjang
                </button>
                <button class="btn-secondary" onclick="openProductModal(${product.id})" style="margin-top: 10px; width: 100%;">
                    Lihat Detail
                </button>
            </div>
        </div>
    `;
    }).join('');
}

function renderCart() {
    cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-message">Keranjang Anda kosong</div>';
        cartTotalElement.textContent = formatPrice(0);
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        return `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${product.name}</div>
                    <div class="cart-item-price">${formatPrice(product.price)}</div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="btn-qty" onclick="updateQuantity(${item.id}, -1)"><i class="fa-solid fa-minus"></i></button>
                            <span>${item.quantity}</span>
                            <button class="btn-qty" onclick="updateQuantity(${item.id}, 1)"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <button class="btn-remove" onclick="removeFromCart(${item.id})">Hapus</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    cartTotalElement.textContent = formatPrice(total);
}

// Toast Function
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');

    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';

    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Logic Functions
window.addToCart = (productId) => {
    const existingItem = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    saveCart();
    renderCart();

    // Toast feedback
    showToast(`Berhasil menambahkan ${product.name}`, 'success');
};

window.updateQuantity = (productId, change) => {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        renderCart();
    }
};

window.removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    showToast('Produk dihapus dari keranjang', 'error');
};

function saveCart() {
    localStorage.setItem('bazon_cart', JSON.stringify(cart));
}

window.toggleWishlist = (productId) => {
    const index = wishlist.indexOf(productId);
    const product = products.find(p => p.id === productId);

    if (index === -1) {
        wishlist.push(productId);
        showToast(`${product.name} ditambahkan ke favorit`, 'success');
    } else {
        wishlist.splice(index, 1);
        showToast(`${product.name} dihapus dari favorit`, 'success');
    }

    localStorage.setItem('bazon_wishlist', JSON.stringify(wishlist));

    // Re-render to update icons and filter if active
    renderProducts(activeCategory, searchInput.value);
};

function openCheckoutModal() {
    if (cart.length === 0) {
        showToast('Keranjang belanja Anda masih kosong!', 'error');
        return;
    }
    cartModal.classList.remove('active'); // Close cart modal
    checkoutModal.classList.add('active'); // Open checkout modal
}

window.processOrder = () => {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    const payment = document.getElementById('paymentMethod').value;

    if (!name || !phone || !address) {
        showToast('Mohon lengkapi semua data!', 'error');
        return;
    }

    const br = '%0A';
    let message = `Halo Admin, saya ingin memesan:${br}${br}`;
    let total = 0;

    cart.forEach((item, index) => {
        const product = products.find(p => p.id === item.id);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        message += `${index + 1}. ${product.name} (x${item.quantity}) - ${formatPrice(itemTotal)}${br}`;
    });

    message += `${br}Total: *${formatPrice(total)}*${br}${br}`;
    message += `📋 Data Pemesan:${br}`;
    message += `Nama: ${name}${br}`;
    message += `No. HP: ${phone}${br}`;
    message += `Alamat: ${address}${br}`;
    message += `Pembayaran: ${payment}${br}`;
    message += `${br}Mohon diproses. Terima kasih!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    showToast('Mengarahkan ke WhatsApp...', 'success');

    // Optional: Clear cart after checkout
    // cart = [];
    // saveCart();
    // renderCart();
    // checkoutModal.classList.remove('active');
};

// Event Listeners
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Product Modal Logic
window.openProductModal = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    modalProductImage.src = product.image;
    modalProductCategory.textContent = product.category;
    modalProductTitle.textContent = product.name;
    modalProductPrice.textContent = formatPrice(product.price);
    modalProductDesc.textContent = product.description;

    // Update Add to Cart button to add specific product
    modalAddToCartBtn.onclick = () => {
        addToCart(product.id);
        productModal.classList.remove('active');
    };

    productModal.classList.add('active');
};

closeProductModal.addEventListener('click', () => {
    productModal.classList.remove('active');
});

productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
        productModal.classList.remove('active');
    }
});

checkoutBtn.addEventListener('click', openCheckoutModal);

closeCheckout.addEventListener('click', () => {
    checkoutModal.classList.remove('active');
});

checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
        checkoutModal.classList.remove('active');
    }
});

// Filter Listeners
let activeCategory = 'all';

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');

        // Filter
        activeCategory = btn.dataset.category;
        renderProducts(activeCategory, searchInput.value);
    });
});

// Search Listener
searchInput.addEventListener('input', (e) => {
    renderProducts(activeCategory, e.target.value);
});

// Slider Logic
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

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    initSlider(); // Initialize Slider
    initTheme(); // Initialize Theme
    renderProducts();
    renderCart();
    renderTestimonials();
});

// Theme Logic
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
