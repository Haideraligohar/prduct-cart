const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const searchInput = document.getElementById("search-input");

// ---------------- LOAD PRODUCTS ----------------
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
                    <button 
                        class="add-to-cart ${product.stock === "out_of_stock" ? "out-of-stock" : ""}" 
                        data-id="${product.id}"
                    >
                        ${product.stock === "out_of_stock" ? "Out of Stock" : "Add to Cart"}
                    </button>
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

          if (productToAdd.stock === "out_of_stock") {
            showToast(`${productToAdd.title} is out of stock!`, "error");
            return;
          }

          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          const existing = cart.find((p) => p.id == id);

          if (existing) existing.quantity = (existing.quantity || 1) + 1;
          else {
            productToAdd.quantity = 1;
            cart.push(productToAdd);
          }

          localStorage.setItem("cart", JSON.stringify(cart));
          showToast(`${productToAdd.title} added to cart!`);
          renderCart();
          updateCartMsg();
        });
      });
    }

    // Apply filters and search
    function applyFilters() {
      let filtered = [...products];
      const category = categoryFilter.value;
      const price = priceFilter.value;
      const searchText = searchInput.value.toLowerCase();

      if (category !== "all") filtered = filtered.filter((p) => p.category === category);
      if (price === "low") filtered.sort((a, b) => a.price - b.price);
      else if (price === "high") filtered.sort((a, b) => b.price - a.price);
      if (searchText) filtered = filtered.filter((p) => p.title.toLowerCase().includes(searchText));

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

// ---------------- CART LOGIC ----------------
const cartContainer = document.querySelector(".products-list-table");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  // Always sync with localStorage
  cart = JSON.parse(localStorage.getItem("cart")) || [];
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

  addCartListeners();
  updateSummary();
}

// ---------------- CART LISTENERS ----------------
function addCartListeners() {
  cartContainer.querySelectorAll(".qty-counter").forEach((counter) => {
    const inc = counter.querySelector(".increment");
    const dec = counter.querySelector(".decrement");
    const input = counter.querySelector(".qty-input");
    const id = counter.closest(".products-list-product_item").dataset.id;

    inc.onclick = () => {
      input.value = parseInt(input.value) + 1;
      cart = cart.map((p) =>
        p.id == id ? { ...p, quantity: parseInt(input.value) } : p
      );
      localStorage.setItem("cart", JSON.stringify(cart));
      updateSummary();
      updateCartMsg();
    };

    dec.onclick = () => {
      if (input.value > 1) {
        input.value = parseInt(input.value) - 1;
        cart = cart.map((p) =>
          p.id == id ? { ...p, quantity: parseInt(input.value) } : p
        );
        localStorage.setItem("cart", JSON.stringify(cart));
        updateSummary();
        updateCartMsg();
      }
    };
  });

  cartContainer.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.onclick = (e) => {
      const id = e.target.dataset.id;
      cart = cart.filter((p) => p.id != id);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartMsg();
    };
  });
}

// ---------------- CART SUMMARY ----------------
function updateSummary() {
  const subtotalEl = document.getElementById("subtotal-amount");
  const deliveryEl = document.getElementById("delivery-amount");
  const taxEl = document.getElementById("tax-amount");
  const totalEl = document.getElementById("total-amount");

  if (!subtotalEl) return;

  const subtotal = cart.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0);
  const delivery = 0;
  const tax = subtotal * 0.1;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  deliveryEl.textContent = `$${delivery.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${(subtotal + delivery + tax).toFixed(2)}`;
}

// ---------------- HEADER CART COUNT ----------------
function updateCartMsg() {
  const cartMsgEl = document.getElementById("cart-msg");
  if (!cartMsgEl) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((sum, p) => sum + (p.quantity || 1), 0);
  cartMsgEl.textContent = totalQuantity;
}

// ---------------- TOAST ----------------
function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.textContent = message;

  toast.style.background = type === "error" ? "#dc3545" : "#28a745"; // red / green
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.marginTop = "10px";
  toast.style.borderRadius = "5px";
  toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s ease";

  toastContainer.appendChild(toast);

  setTimeout(() => (toast.style.opacity = "1"), 50);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 1000);
}

// ---------------- INITIAL ----------------
renderCart();
updateCartMsg();
