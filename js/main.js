fetch("./data/product.json")
  .then((res) => res.json())
  .then((products) => {
    const container = document.getElementById("products-cart-wrapper");

    products.forEach((product) => {
      container.innerHTML += `
        <div class="product-card">
          <div class="image-wrapper">
            <img src="${product.image}" alt="${product.title}" class="product-image">
          </div>

          <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <h1>${product.category}</h1>

            <p class="product-description">
              ${product.description.substring(0, 80)}...
            </p>

            <div class="product-bottom">
              <span class="product-price">$${product.price}</span>
              <button class="add-to-cart" data-id="${product.id}">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch((err) => console.error("Error loading products:", err));
