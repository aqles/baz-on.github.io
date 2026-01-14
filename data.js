// ==========================================
// DATA WEBSITE BAZ-ON
// Silakan edit bagian di bawah ini untuk mengubah konten website.
// ==========================================

// 1. DATA SLIDE HERO (BANNER UTAMA)
const heroSlides = [
    {
        id: 1,
        title: 'Temukan Gaya <span class="gradient-text">Premium</span> Anda',
        description: 'Koleksi eksklusif dengan kualitas terbaik untuk menunjang penampilan Anda.',
        image: 'images/jacket.png',
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

// 2. DATA PRODUK
const products = [
    {
        id: 1,
        name: "Noir Executive Watch",
        price: 1500000,
        originalPrice: 2000000,
        category: "Accessories",
        image: "images/watch.png",
        description: "Jam tangan premium dengan desain minimalis untuk eksekutif muda.",
        badge: "best-seller",
        rating: 4.8,
        reviews: 128,
        stock: 15,
        specs: ["Material: Stainless Steel", "Water Resistant: 5 ATM", "Movement: Quartz", "Diameter: 42mm"],
        variants: {
            colors: ["Silver", "Black Gold"]
        }
    },
    {
        id: 2,
        name: "Urban Leather Jacket",
        price: 850000,
        category: "Fashion",
        image: "images/jacket.png",
        description: "Jaket kulit sintetis premium, cocok untuk gaya urban casual.",
        rating: 4.5,
        reviews: 85,
        stock: 42,
        specs: ["Material: Premium Synthetic Leather", "Lining: Cotton", "Fit: Regular", "Pockets: 4"],
        variants: {
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["Black", "Dark Brown"]
        }
    },
    {
        id: 3,
        name: "Midnight Sneakers",
        price: 650000,
        originalPrice: 850000,
        category: "Footwear",
        image: "images/sneakers.png",
        description: "Sneakers hitam elegan dengan kenyamanan maksimal untuk aktivitas harian.",
        badge: "limited",
        rating: 4.9,
        reviews: 210,
        stock: 8,
        specs: ["Upper: Breathable Mesh", "Sole: Rubber", "Insole: Memory Foam", "Weight: Lightweight"],
        variants: {
            sizes: ["39", "40", "41", "42", "43", "44"]
        }
    },
    {
        id: 4,
        name: "Heritage Backpack",
        price: 450000,
        category: "Bags",
        image: "images/backpack.png",
        description: "Tas punggung vintage dengan material kanvas tahan air.",
        rating: 4.6,
        reviews: 64,
        stock: 25,
        specs: ["Material: Waterproof Canvas", "Capacity: 20L", "Laptop Compartment: 15.6 inch", "Waterproof: Yes"],
        variants: {
            colors: ["Khaki", "Army Green", "Black"]
        }
    },
    {
        id: 5,
        name: "Audio Pro Headset",
        price: 2100000,
        originalPrice: 2500000,
        category: "Electronics",
        image: "images/headset.png",
        description: "Headset noise-cancelling dengan kualitas suara studio.",
        badge: "best-seller",
        rating: 5.0,
        reviews: 42,
        stock: 5,
        specs: ["Type: Over-Ear", "Connection: Bluetooth 5.2", "Battery: 30 Hours", "ANC: Active Noise Cancellation"]
    },
    {
        id: 6,
        name: "Slim Fit Chinos",
        price: 350000,
        category: "Fashion",
        image: "images/chinos.png",
        description: "Celana chinos nyaman dengan potongan slim fit modern.",
        rating: 4.4,
        reviews: 150,
        stock: 100,
        specs: ["Material: Cotton Twill Stretch", "Fit: Slim Fit", "Waist: Button & Zip", "Care: Machine Wash"],
        variants: {
            sizes: ["28", "30", "32", "34", "36"],
            colors: ["Khaki", "Navy", "Black"]
        }
    }
];

// 3. DATA TESTIMONI
const testimonials = [
    {
        id: 1,
        name: "Budi Santoso",
        role: "Verified Buyer",
        text: "Kualitas jaketnya luar biasa! Bahannya tebal tapi adem dipakai. Pengiriman juga sangat cepat.",
        rating: 5,
        image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Kingston"
    },
    {
        id: 2,
        name: "Siti Rahmawati",
        role: "Fashion Enthusiast",
        text: "Suka banget sama model jam tangannya. Elegan dan mewah, cocok buat dipakai ke kantor.",
        rating: 5,
        image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Amaya"
    },
    {
        id: 3,
        name: "Andi Pratama",
        role: "Regular Customer",
        text: "Sneakers-nya nyaman banget dipakai seharian. Ukurannya pas dan sesuai deskripsi.",
        rating: 4,
        image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Chase"
    }
];
// 4. KONFIGURASI UMUM
const config = {
    whatsappNumber: "6281234567890", // Ganti dengan nomor WhatsApp admin (format 62...)
    enableFlashSale: true, // Set false untuk menyembunyikan bagian Flash Sale
    maxProducts: 8, // Jumlah maksimal produk yang ditampilkan di homepage (Set 0 untuk tampilkan semua)
    flashSaleDurationHours: 24, // Durasi flash sale dalam jam
    coupons: [
        {
            code: 'BAZON10',
            type: 'percent',
            value: 10,
            description: 'Diskon 10%'
        },
        {
            code: 'HEMAT50',
            type: 'fixed',
            value: 50000,
            description: 'Potongan Rp 50.000'
        }
    ]
};
