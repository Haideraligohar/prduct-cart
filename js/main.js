const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const searchInput = document.getElementById("search-input");

fetch("./data/product.json")
  .then((res) => res.json())
  .then((products) => {
    const container = document.getElementById("products-cart-wrapper");

    // Render products function
    function renderProducts(filteredProducts) {
      container.innerHTML = filteredProducts
        .map(
          (product) => `
        <div class="product-card">
            <div class="image-wrapper">
                <img src="${product.image}" alt="${product.title}" class="product-image img-fluid">
            </div>
            <div class="product-info">
                <h2 class="product-title">${product.title}</h2>
                <h1>${product.category}</h1>
                <p class="product-description">${product.description.substring(0, 50)}...</p>
                <div class="product-bottom">
                    <span class="product-price">$${product.price}</span>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
      `
        )
        .join("");

      // Add to cart buttons
      container.querySelectorAll(".add-to-cart").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.target.dataset.id;
          const productToAdd = products.find((p) => p.id == id);
          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          const existing = cart.find((p) => p.id == id);
          if (existing) existing.quantity = (existing.quantity || 1) + 1;
          else {
            productToAdd.quantity = 1;
            cart.push(productToAdd);
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          alert(`${productToAdd.title} added to cart!`);
          renderCart();
        });
      });
    }

    // Apply filters and search
    function applyFilters() {
      let filtered = [...products];
      const category = categoryFilter.value;
      const price = priceFilter.value;
      const searchText = searchInput.value.toLowerCase();

      // Category filter
      if (category !== "all") {
        filtered = filtered.filter((p) => p.category === category);
      }

      // Price filter
      if (price === "low") filtered.sort((a, b) => a.price - b.price);
      else if (price === "high") filtered.sort((a, b) => b.price - a.price);

      // Search filter
      if (searchText) {
        filtered = filtered.filter((p) =>
          p.title.toLowerCase().includes(searchText)
        );
      }

      renderProducts(filtered);
    }

    // Event listeners
    categoryFilter.addEventListener("change", applyFilters);
    priceFilter.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);

    // Initial render
    renderProducts(products);
  })
  .catch((err) => console.error("Error loading products:", err));

// CART LOGIC
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.querySelector(".products-list-table");

function renderCart() {
  if (!cartContainer) return;
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
    `
    )
    .join("");

  // Quantity buttons
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

  // Delete product
  cartContainer.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      cart = cart.filter((p) => p.id != id);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });

  updateSummary();
}

function updateSummary() {
  const subtotalEl = document.getElementById("subtotal-amount");
  const deliveryEl = document.getElementById("delivery-amount");
  const taxEl = document.getElementById("tax-amount");
  const totalEl = document.getElementById("total-amount");

  if (!subtotalEl) return;

  const subtotal = cart.reduce(
    (sum, p) => sum + p.price * (p.quantity || 1),
    0
  );
  const delivery = 0;
  const tax = subtotal * 0.1;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  deliveryEl.textContent = `$${delivery.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${(subtotal + delivery + tax).toFixed(2)}`;
}

renderCart();
