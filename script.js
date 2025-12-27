// Product Data
const products = [
    {
        id: 1,
        name: "Noir Executive Watch",
        price: 1500000,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000",
        description: "Jam tangan premium dengan desain minimalis untuk eksekutif muda."
    },
    {
        id: 2,
        name: "Urban Leather Jacket",
        price: 850000,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1551028919-ac66e624ec06?auto=format&fit=crop&q=80&w=1000",
        description: "Jaket kulit sintetis premium, cocok untuk gaya urban casual."
    },
    {
        id: 3,
        name: "Midnight Sneakers",
        price: 650000,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000",
        description: "Sneakers hitam elegan dengan kenyamanan maksimal untuk aktivitas harian."
    },
    {
        id: 4,
        name: "Heritage Backpack",
        price: 450000,
        category: "Bags",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000",
        description: "Tas punggung vintage dengan material kanvas tahan air."
    },
    {
        id: 5,
        name: "Audio Pro Headset",
        price: 2100000,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
        description: "Headset noise-cancelling dengan kualitas suara studio."
    },
    {
        id: 6,
        name: "Slim Fit Chinos",
        price: 350000,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1000",
        description: "Celana chinos nyaman dengan potongan slim fit modern."
    }
];

// Config
const WHATSAPP_NUMBER = "6281234567890"; // Ganti dengan nomor WhatsApp admin yang benar (format 62...)

// State
let cart = JSON.parse(localStorage.getItem('bazon_cart')) || [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
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
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
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
            </div>
        </div>
    `).join('');
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

// Logic Functions
window.addToCart = (productId) => {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    saveCart();
    renderCart();

    // Animation feedback
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Berhasil';
    btn.style.background = 'var(--accent)';
    btn.style.color = 'var(--bg-color)';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.color = '';
    }, 1500);
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
};

function saveCart() {
    localStorage.setItem('bazon_cart', JSON.stringify(cart));
}

function handleCheckout() {
    if (cart.length === 0) {
        alert('Keranjang belanja Anda masih kosong!');
        return;
    }

    const br = '%0A'; // New line for URL encoding
    let message = `Halo Admin, saya ingin memesan:${br}${br}`;
    let total = 0;

    cart.forEach((item, index) => {
        const product = products.find(p => p.id === item.id);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        message += `${index + 1}. ${product.name} (x${item.quantity}) - ${formatPrice(itemTotal)}${br}`;
    });

    message += `${br}Total: *${formatPrice(total)}*${br}`;
    message += `${br}Mohon info selanjutnya untuk pembayaran dan pengiriman. Terima kasih!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

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

checkoutBtn.addEventListener('click', handleCheckout);

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
});
