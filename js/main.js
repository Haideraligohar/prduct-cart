// ---------------- FILTER ELEMENTS ----------------
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const searchInput = document.getElementById("search-input");

// ---------------- GLOBAL CART SYNC ----------------
let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  updateCartMsg();
  renderCart();
});

window.addEventListener("focus", () => {
  updateCartMsg();
  renderCart();
  renderProducts(allProducts);
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    updateCartMsg();
    renderCart();
    renderProducts(allProducts);
  }
});

// ---------------- LOAD PRODUCTS ----------------
fetch("./data/product.json")
  .then((res) => res.json())
  .then((products) => {
    // Ensure numeric fields (id and quantity and price) are numbers
    allProducts = products.map((p) => ({
      ...p,
      id: Number(p.id),
      quantity: Number(p.quantity),
      price: Number(p.price),
    }));
    renderProducts(allProducts);

    categoryFilter?.addEventListener("change", applyFilters);
    priceFilter?.addEventListener("change", applyFilters);
    searchInput?.addEventListener("input", applyFilters);
  })
  .catch((err) => console.error("Error loading products:", err));

// ---------------- FILTER FUNCTION ----------------
function applyFilters() {
  let filtered = [...allProducts];
  const category = categoryFilter?.value || "all";
  const price = priceFilter?.value || "all";
  const searchText = (searchInput?.value || "").toLowerCase();

  if (category !== "all")
    filtered = filtered.filter((p) => p.category === category);
  if (price === "low") filtered.sort((a, b) => a.price - b.price);
  else if (price === "high") filtered.sort((a, b) => b.price - a.price);
  if (searchText)
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(searchText),
    );

  renderProducts(filtered);
}

// ---------------- RENDER PRODUCTS ----------------
function renderProducts(products) {
  const container = document.getElementById("products-cart-wrapper");
  if (!container) return;

  const cart = getCart();

  container.innerHTML = products
    .map((product) => {
      const inCart = cart.find((c) => Number(c.id) === Number(product.id));
      const available = Number(product.quantity) - (inCart?.cartQuantity || 0);

      return `
    <div class="product-card" data-id="${product.id}">
        <div class="image-wrapper">
            <img src="${product.image}" alt="${product.title}" class="product-image img-fluid">
        </div>
        <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <h1>${product.category}</h1>
            <p class="product-description">${product.description.substring(0, 50)}...</p>
            <p class="product-availibility" style="color: ${available === 0 ? "red" : "#FF6F40"};">
                Available: <span class="product-qty-span">${available}</span>
            </p>
            <div class="product-bottom">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button 
                    class="add-to-cart ${available === 0 ? "out-of-stock" : ""}" 
                    data-id="${product.id}"
                    ${available === 0 ? "disabled" : ""}>
                    ${available === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
            </div>
        </div>
    </div>`;
    })
    .join("");

  // attach add-to-cart listeners
  container.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      const product = allProducts.find((p) => p.id === id);
      if (!product) return;

      let cart = getCart();
      const existing = cart.find((c) => Number(c.id) === id);
      const available = product.quantity - (existing?.cartQuantity || 0);

      if (available <= 0) {
        showToast(`${product.title} is out of stock!`, "error");
        return;
      }

      if (existing) existing.cartQuantity++;
      else
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          cartQuantity: 1,
        });

      saveCart(cart);
      showToast(`${product.title} added to cart!`);
      renderCart();
      renderProducts(allProducts);
      updateCartMsg();
    });
  });
}

// ---------------- CART LOGIC ----------------
const cartContainer = document.querySelector(".products-list-table");

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  const cart = getCart();
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
    updateSummary();
    updateCartMsg();
    return;
  }

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
                <input type="text" class="qty-input" value="${product.cartQuantity}" readonly>
                <button class="btn increment">+</button>
              </div>
            </div>
          </div>
          <div class="col-sm-3 col-6">
            <div class="product-price-wrapper">
              <div class="product-price">
                <h4>$${product.price.toFixed(2)}</h4>
              </div>
              <div class="product-delete">
                <div class="delete-btn" data-id="${product.id}">×</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`,
    )
    .join("");

  addCartListeners();
  updateSummary();
  updateCartMsg();
}

// ---------------- CART LISTENERS ----------------
function addCartListeners() {
  if (!cartContainer) return;

  // Quantity controls
  cartContainer.querySelectorAll(".qty-counter").forEach((counter) => {
    const inc = counter.querySelector(".increment");
    const dec = counter.querySelector(".decrement");
    const input = counter.querySelector(".qty-input");
    const id = Number(
      counter.closest(".products-list-product_item").dataset.id,
    );

    inc.onclick = () => {
      const cart = getCart();
      const cartItem = cart.find((p) => Number(p.id) === id);
      const productData = allProducts.find((p) => Number(p.id) === id);
      if (!cartItem || !productData) return;

      const available =
        Number(productData.quantity) - Number(cartItem.cartQuantity);

      if (available > 0) {
        cartItem.cartQuantity = Number(cartItem.cartQuantity) + 1;
        saveCart(cart);
        renderCart();
        renderProducts(allProducts);
      } else {
        showToast(`No more ${productData.title} available!`, "error");
      }
    };

    dec.onclick = () => {
      const cart = getCart();
      const cartItem = cart.find((p) => Number(p.id) === id);
      const productData = allProducts.find((p) => Number(p.id) === id);
      if (!cartItem || !productData) return;

      if (cartItem.cartQuantity > 1) {
        cartItem.cartQuantity = Number(cartItem.cartQuantity) - 1;
        saveCart(cart);
        renderCart();
        renderProducts(allProducts);
      } else {
        showToast(`${productData.title} cannot be less than 1!`, "error");
      }
    };
  });

  // Delete buttons
  cartContainer.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.onclick = (e) => {
      const id = Number(e.currentTarget.dataset.id);
      let cart = getCart().filter((p) => Number(p.id) !== id);
      saveCart(cart);
      renderCart();
      renderProducts(allProducts);
      updateCartMsg();
    };
  });
}

// ---------------- SUMMARY ----------------
function updateSummary() {
  const subtotalEl = document.getElementById("subtotal-amount");
  const deliveryEl = document.getElementById("delivery-amount");
  const taxEl = document.getElementById("tax-amount");
  const totalEl = document.getElementById("total-amount");
  if (!subtotalEl) return;

  const cart = getCart();
  const subtotal = cart.reduce(
    (sum, p) => sum + Number(p.price) * Number(p.cartQuantity),
    0,
  );
  const delivery = 0;
  const tax = subtotal * 0.1;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  deliveryEl.textContent = `$${delivery.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${(subtotal + delivery + tax).toFixed(2)}`;
}

// ---------------- HEADER COUNT ----------------
function updateCartMsg() {
  const cartMsgEl = document.getElementById("cart-msg");
  if (!cartMsgEl) return;

  const cart = getCart();
  const totalQuantity = cart.reduce(
    (sum, p) => sum + Number(p.cartQuantity),
    0,
  );
  cartMsgEl.textContent = totalQuantity;
}

// ---------------- TOAST ----------------
function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) return;

  const toast = document.createElement("div");

  toast.className = type; // "error" or "success"
  toast.textContent = message;

  toastContainer.appendChild(toast);

  // Fade in
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
  });

  // Fade out
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 1500);
}
