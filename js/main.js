// Fetch products and render on home page
fetch("./data/product.json")
  .then((res) => res.json())
  .then((products) => {
    const container = document.getElementById("products-cart-wrapper");

    // Render products dynamically
    const productCards = products.map(
      (product) => `
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
    `,
    );

    container.innerHTML = productCards.join("");

    // Handle Add to Cart button click
    container.querySelectorAll(".add-to-cart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const productToAdd = products.find((p) => p.id == id);

        // Get cart from localStorage or empty array
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if product already exists in cart
        const existing = cart.find((p) => p.id == id);
        if (existing) {
          existing.quantity = (existing.quantity || 1) + 1;
        } else {
          productToAdd.quantity = 1; // default quantity
          cart.push(productToAdd);
        }

        // Save cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`${productToAdd.title} added to cart!`);
        renderCart(); // optional: auto-update cart page if visible
      });
    });
  })
  .catch((err) => console.error("Error loading products:", err));

// CART LOGIC
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.querySelector(".products-list-table");

// Render cart items
function renderCart() {
  cartContainer.innerHTML = cart
    .map(
      (product) => `
      <div class="products-list-product_item" data-id="${product.id}">
        <div class="product-details">
          <div class="row align-items-center">
            <div class="col-sm-6">
              <div class="product-info-wrapper">
                <div class="product-img">
                  <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info-content">
                  <h2 class="product-name">${product.title}</h2>
                </div>
              </div>
            </div>
            <div class="col-sm-3 col-6">
              <div class="product-qty">
                <div class="qty-counter">
                  <button class="btn decrement">−</button>
                  <input type="text" class="qty-input" value="${product.quantity || 1}" readonly>
                  <button class="btn increment">+</button>
                </div>
              </div>
            </div>
            <div class="col-sm-3 col-6">
              <div class="product-price-wrapper">
                <div class="product-price">
                  <h4>$${product.price}</h4>
                </div>
                <div class="product-delete">
                  <div class="delete-btn" data-id="${product.id}">×</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    )
    .join("");

  // Handle quantity increment/decrement
  cartContainer.querySelectorAll(".qty-counter").forEach((counter) => {
    const inc = counter.querySelector(".increment");
    const dec = counter.querySelector(".decrement");
    const input = counter.querySelector(".qty-input");
    const id = counter.closest(".products-list-product_item").dataset.id;

    inc.addEventListener("click", () => {
      input.value = parseInt(input.value) + 1;
      cart = cart.map((p) =>
        p.id == id ? { ...p, quantity: parseInt(input.value) } : p
      );
      localStorage.setItem("cart", JSON.stringify(cart));
      updateSummary();
    });

    dec.addEventListener("click", () => {
      if (input.value > 1) {
        input.value = parseInt(input.value) - 1;
        cart = cart.map((p) =>
          p.id == id ? { ...p, quantity: parseInt(input.value) } : p
        );
        localStorage.setItem("cart", JSON.stringify(cart));
        updateSummary();
      }
    });
  });

  // Handle product deletion
  cartContainer.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      cart = cart.filter((p) => p.id != id);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });

  // Update summary
  updateSummary();
}

// Update subtotal, tax, total
function updateSummary() {
  const subtotalEl = document.getElementById("subtotal-amount");
  const deliveryEl = document.getElementById("delivery-amount");
  const taxEl = document.getElementById("tax-amount");
  const totalEl = document.getElementById("total-amount");

  const subtotal = cart.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0);
  const delivery = 0;
  const tax = subtotal * 0.1; // 10% tax

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  deliveryEl.textContent = `$${delivery.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${(subtotal + delivery + tax).toFixed(2)}`;
}

// Initial cart render
renderCart();
