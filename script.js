const dishes = [
  {id:1, name:"Crispy Paneer Tikka", category:"Starters", price:229, tag:"CHEF'S PICK", type:"Vegetarian", description:"Smoky paneer cubes, marinated in house spices.", image:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=80"},
  {id:2, name:"Masala Fries", category:"Starters", price:129, tag:"CROWD FAVOURITE", type:"Vegetarian", description:"Golden fries tossed with our signature masala.", image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80"},
  {id:3, name:"Classic Chicken Biryani", category:"Biryani", price:279, tag:"BESTSELLER", type:"Contains chicken", description:"Fragrant basmati rice, tender chicken and warm spices.", image:"https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=80"},
  {id:4, name:"Veg Dum Biryani", category:"Biryani", price:219, tag:"HOUSE SPECIAL", type:"Vegetarian", description:"Slow-cooked basmati rice with garden-fresh vegetables.", image:"https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=900&q=80"},
  {id:5, name:"Butter Paneer Masala", category:"Main Course", price:249, tag:"RICH & CREAMY", type:"Vegetarian", description:"Paneer in a velvety tomato and butter gravy.", image:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80"},
  {id:6, name:"Tandoori Chicken", category:"Main Course", price:299, tag:"TANDOOR FRESH", type:"Contains chicken", description:"Yogurt-marinated chicken roasted with smoky spices.", image:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80"},
  {id:7, name:"Gulab Jamun", category:"Desserts", price:99, tag:"SWEET FAVOURITE", type:"2 pieces", description:"Soft milk dumplings soaked in fragrant sugar syrup.", image:"https://images.unsplash.com/photo-1666190092159-6f5f2d8d8f6e?auto=format&fit=crop&w=900&q=80"},
  {id:8, name:"Chocolate Brownie", category:"Desserts", price:149, tag:"CHOCOLATE LOVE", type:"Vegetarian", description:"Warm chocolate brownie with a rich, fudgy centre.", image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80"},
  {id:9, name:"Mango Lassi", category:"Drinks", price:89, tag:"COOL & CREAMY", type:"Chilled drink", description:"A refreshing blend of ripe mango and creamy yogurt.", image:"https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=900&q=80"}
];

let selectedCategory = "All";
let cart = {};
const menuGrid = document.getElementById("menu-grid");
const searchInput = document.getElementById("search");
const emptyMessage = document.getElementById("empty-message");
const cartPanel = document.getElementById("cart-panel");
const cartOverlay = document.getElementById("cart-overlay");
const toast = document.getElementById("toast");

function money(amount) {
  return new Intl.NumberFormat("en-IN", {style:"currency", currency:"INR", maximumFractionDigits:0}).format(amount);
}

function renderMenu() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = dishes.filter(dish =>
    (selectedCategory === "All" || dish.category === selectedCategory) &&
    (dish.name.toLowerCase().includes(query) || dish.description.toLowerCase().includes(query) || dish.category.toLowerCase().includes(query))
  );
  menuGrid.innerHTML = filtered.map(dish => `
    <article class="dish-card">
      <div class="dish-image-wrap">
        <img class="dish-image" src="${dish.image}" alt="${dish.name}" loading="lazy" onerror="this.style.display='none'">
        <span class="dish-tag">${dish.tag}</span>
      </div>
      <div class="dish-info">
        <div class="dish-title-line"><h3 class="dish-title">${dish.name}</h3><span class="dish-price">${money(dish.price)}</span></div>
        <p class="dish-description">${dish.description}</p>
        <div class="dish-bottom"><span class="dish-type">${dish.type}</span><button class="add-button" data-add="${dish.id}">+ Add to order</button></div>
      </div>
    </article>`).join("");
  emptyMessage.hidden = filtered.length > 0;
}

function renderCart() {
  const entries = Object.entries(cart).filter(([, quantity]) => quantity > 0);
  const count = entries.reduce((sum, [, quantity]) => sum + quantity, 0);
  const total = entries.reduce((sum, [id, quantity]) => sum + dishes.find(d => d.id === Number(id)).price * quantity, 0);
  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent = money(total);
  document.getElementById("cart-items").innerHTML = entries.length ? entries.map(([id, quantity]) => {
    const dish = dishes.find(d => d.id === Number(id));
    return `<div class="cart-row">
      <div><h3>${dish.name}</h3><p>${money(dish.price)} each</p>
        <div class="quantity-controls"><button data-change="${id}" data-delta="-1" aria-label="Remove one ${dish.name}">−</button><span>${quantity}</span><button data-change="${id}" data-delta="1" aria-label="Add one ${dish.name}">+</button></div>
      </div><span class="cart-line-price">${money(dish.price * quantity)}</span>
    </div>`;
  }).join("") : '<p class="cart-empty">Your cart is waiting for something delicious.</p>';
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function openCart() {
  cartPanel.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
  cartOverlay.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
  cartOverlay.hidden = true;
  document.body.style.overflow = "";
}

document.getElementById("filters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  selectedCategory = button.dataset.category;
  document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
  renderMenu();
});
searchInput.addEventListener("input", renderMenu);
menuGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const id = Number(button.dataset.add);
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
  showToast(`${dishes.find(d => d.id === id).name} added to your order`);
});
document.getElementById("cart-items").addEventListener("click", event => {
  const button = event.target.closest("[data-change]");
  if (!button) return;
  const id = Number(button.dataset.change);
  cart[id] = (cart[id] || 0) + Number(button.dataset.delta);
  if (cart[id] <= 0) delete cart[id];
  renderCart();
});
document.getElementById("open-cart").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
document.addEventListener("keydown", event => { if (event.key === "Escape") closeCart(); });
document.getElementById("checkout").addEventListener("click", () => {
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  if (!count) return showToast("Add a dish to your order first");
  showToast("Demo only — connect an ordering service to accept orders");
});
document.getElementById("year").textContent = new Date().getFullYear();
renderMenu();
renderCart();
