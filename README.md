<div align="center">
  <img src="logo.svg" alt="Baz-On Logo" width="120" />

  # Baz-On Store
  
  **Premium Static E-Commerce Template**
  
  [View Demo](https://aqles.github.io/baz-on)
  
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

  <img src="images/desktop-preview.png" alt="Desktop Preview" width="800" style="border-radius: 10px; margin: 20px 0;"/>
</div>

---

## About The Project

Baz-On Store is a high-performance static e-commerce template designed to offer a premium shopping experience without the complexity of a backend. Built with a focus on modern aesthetics, it utilizes glassmorphism, smooth animations, and a responsive layout to engage users across all devices.

The core philosophy of this project is **simplicity meets elegance**. It bridges the gap between digital browsing and personalized service by generating pre-formatted WhatsApp orders at checkout, allowing for a direct and human-centric purchasing process.

### Key Features

*   **Dynamic Hero Slider**: An engaging, touch-responsive slideshow that highlights featured collections with auto-play and manual navigation.
*   **Interactive Product Experience**:
    *   **Quick View Modal**: Detailed product previews without leaving the page.
    *   **Wishlist System**: extensive "Add to Favorites" functionality with instant visual feedback.
    *   **Smart Filtering**: Instant search and category filtering for seamless navigation.
*   **Modern User Interface**:
    *   **Glassmorphism Design**: Sleek, translucent elements that provide depth and hierarchy.
    *   **Toast Notifications**: Non-intrusive, animated alerts for user actions (e.g., "Added to Cart").
    *   **Dark Mode Aesthetic**: A carefully curated color palette optimized for visual comfort and luxury appeal.
*   **Seamless Checkout**:
    *   **Persistent Cart**: LocalStorage integration ensures shopping carts are saved between sessions.
    *   **WhatsApp Integration**: Automatically generates a detailed order summary and redirects to WhatsApp for payment processing.

## Tech Stack

This project allows for maximum customization and zero dependency issues by using **Pure Vanilla Web Technologies**:

*   **HTML5**: Semantic structure for better accessibility and SEO.
*   **CSS3**: Advanced styling using Custom Properties (Variables), Flexbox, and Grid. No external CSS frameworks (like Tailwind or Bootstrap) were used, ensuring complete control over the design system.
*   **JavaScript (ES6+)**: specialized logic for state management (Cart/Wishlist), DOM manipulation, and interactive features without heavy libraries (like React or Vue).

## Installation & Setup

To run this project locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/aqles/baz-on.git
    ```
2.  **Open the project**
    Simply navigate to the project folder and open `index.html` in your web browser. 
    
    *Recommendation*: Use a local development server (e.g., Live Server for VS Code) for the best experience with asset loading and routing.

## Customization

### Product Catalog
Product data is managed clearly within `script.js` in the `products` array. You can easily add, remove, or modify product details, images, and categories.

### Configuration
*   **WhatsApp Number**: Update the `WHATSAPP_NUMBER` constant in `script.js` to change the recipient for order messages.
*   **Slide Data**: Modify the `heroSlides` array in `script.js` to update the homepage banner content.

## License

Distributed under the MIT License. Please see the `LICENSE` file for more information.

---

<div align="center">
  <p>Created by <a href="https://github.com/aqles">Aqles</a></p>
</div>
