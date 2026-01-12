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

Baz-On Store is a static e-commerce website designed to provide a seamless shopping experience without the need for a complex backend. The project focuses on a modern interface using glassmorphism design principles and ensures full responsiveness across all devices.

One of the key features is the "Checkout via WhatsApp" flow. Instead of processing payments through a gateway, the application generates a pre-formatted order summary and redirects the customer to WhatsApp, effectively bridging the gap between digital browsing and personalized service.

### Key Features

*   **Modern UI/UX**: Designed with a dark mode aesthetic, featuring glassmorphism elements and smooth interactions.
*   **Responsive Design**: Layouts adapt fluidly from desktop screens to mobile devices.
*   **Persistent Cart**: Shopping cart data is saved to LocalStorage, allowing users to return without losing their items.
*   **WhatsApp Integration**: Automated order generation creates a direct communication channel for checkout.
*   **Performance**: Built as a pure static site for maximum speed and minimal latency.

## Tech Stack

The project relies on standard web technologies without heavy frameworks:
*   HTML5 for structure
*   Vanilla CSS3 (using Custom Variables for theming)
*   Vanilla JavaScript (ES6+) for logic
*   FontAwesome and Google Fonts for assets

## Installation & Setup

To run this project on your local machine:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/aqles/baz-on.git
    ```
2.  **Open the project**
    Simply navigate to the project folder and open `index.html` in your web browser. For a better development experience, you can use a local server (like Live Server in VS Code or Python's http.server).

## Customization

### Configuring Products
You can manage the product catalog by editing the `products` array in the `script.js` file. Each object represents a product with its details and image path.

### Setting Admin Number
To receive orders on a specific WhatsApp number, update the `WHATSAPP_NUMBER` constant in `script.js`. Ensure the number uses the international format (e.g., 628...).

## License

Distributed under the MIT License. Please see the `LICENSE` file for more information.

---

<div align="center">
  <p>Created by <a href="https://github.com/aqles">Aqles</a></p>
</div>
