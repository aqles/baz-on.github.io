# Baz-On Store (Static E-Commerce)

Project web e-commerce statik modern dengan fitur checkout via WhatsApp. Dibangun dengan HTML5, CSS3, dan JavaScript murni tanpa framework berat.

## Fitur Unggulan

- **Desain Premium**: Tampilan modern dengan tema gelap (Dark Mode style), glassmorphism, dan animasi halus.
- **Responsif**: Tampilan optimal di desktop, tablet, dan mobile.
- **Keranjang Belanja**: Menggunakan `localStorage` sehingga data keranjang tidak hilang saat page di-refresh.
- **WhatsApp Checkout**: Checkout otomatis yang mengarahkan pembeli ke WhatsApp dengan format pesan yang rapi.
- **Ringan & Cepat**: Tanpa backend complex, load time sangat cepat.

## Cara Menggunakan

1.  Clone repository ini atau download sebagai ZIP.
2.  Buka file `index.html` di browser Anda.
3.  Web siap digunakan!

## Kustomisasi

### Mengganti Produk
Buka file `script.js` dan edit array `products`:

```javascript
const products = [
    {
        id: 1,
        name: "Nama Produk",
        price: 150000,
        category: "Kategori",
        image: "URL_GAMBAR",
        description: "Deskripsi..."
    },
    // ...
];
```

### Mengganti Nomor WhatsApp
Buka file `script.js` dan ubah konstanta `WHATSAPP_NUMBER`:

```javascript
const WHATSAPP_NUMBER = "628xxxxxxxxxx"; // Gunakan format 62 (kode negara Indonesia)
```

## Struktur File

- `index.html`: Struktur utama halaman web.
- `style.css`: Styling dan tema visual.
- `script.js`: Logika aplikasi, data produk, dan fungsi checkout.

## Author

Dibuat untuk project ednasalam.com
