import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000/api/dishes";

// Images for different food types
const foodImages = {
  starter:
    "https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=800&q=80",
  main:
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
  dessert:
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
  pizza:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
  pasta:
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
  
  burger:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  salad:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  cake:
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  iceCream:
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
  biryani:
  "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
  indian:
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
};

function getFoodImage(dish) {
  const name = (dish.name || "").toLowerCase();
  const category = (dish.category || "").toLowerCase();

  if (name.includes("pizza")) return foodImages.pizza;
  if (name.includes("burger")) return foodImages.burger;
  if (name.includes("salad")) return foodImages.salad;
  if (name.includes("cake")) return foodImages.cake;

  if (
    name.includes("ice cream") ||
    name.includes("icecream") ||
    name.includes("brownie") ||
    name.includes("pudding") ||
    name.includes("cheesecake") ||
    name.includes("dessert")
  ) {
    return foodImages.iceCream;
  }

  if (
    name.includes("biryani") ||
    name.includes("biriyani") ||
    name.includes("pulao")
  ) {
    return foodImages.biryani;
  }

  if (
    name.includes("dosa") ||
    name.includes("idli") ||
    name.includes("paneer") ||
    name.includes("curry") ||
    name.includes("naan") ||
    name.includes("tikka")
  ) {
    return foodImages.indian;
  }

  if (
    name.includes("pasta") ||
    name.includes("spaghetti") ||
    name.includes("lasagna") ||
    name.includes("macaroni")
  ) {
    return foodImages.main;
  }

  if (
    name.includes("soup") ||
    name.includes("spring roll") ||
    name.includes("bruschetta") ||
    name.includes("starter")
  ) {
    return foodImages.starter;
  }

  if (category === "dessert") return foodImages.dessert;
  if (category === "starter") return foodImages.starter;

  return foodImages.main;
}

const initialForm = {
  name: "",
  description: "",
  category: "Starter",
  price: "",
  available: true,
};

function App() {
  const [dishes, setDishes] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  async function loadDishes() {
    try {
      const response = await axios.get(API);
      setDishes(response.data);
      setError("");
    } catch {
      setError("Unable to load menu. Check that your backend is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDishes();
  }, []);

  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const payload = {
        ...form,
        price: Number(form.price),
      };

      if (editingId) {
        await axios.put(`${API}/${editingId}`, payload);
      } else {
        await axios.post(API, payload);
      }

      setForm(initialForm);
      setEditingId(null);
      await loadDishes();
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not save the dish."
      );
    }
  }

  function editDish(dish) {
    setForm({
      name: dish.name,
      description: dish.description,
      category: dish.category,
      price: String(dish.price),
      available: dish.available,
    });

    setEditingId(dish._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function toggleAvailability(id) {
    try {
      await axios.patch(`${API}/${id}/availability`);
      await loadDishes();
    } catch {
      setError("Could not update dish availability.");
    }
  }

  async function deleteDish(id) {
    if (!window.confirm("Are you sure you want to delete this dish?")) {
      return;
    }

    try {
      await axios.delete(`${API}/${id}`);
      await loadDishes();
    } catch {
      setError("Could not delete this dish.");
    }
  }

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch =
      (dish.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (dish.description || "").toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      filter === "All" || dish.category === filter;

    return matchesSearch && matchesCategory;
  });

  function cancelEdit() {
    setEditingId(null);
    setForm(initialForm);
    setError("");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home">
          <span className="brand-icon">✦</span>
          <span>
            <strong>MAISON</strong>
            <small>RESTAURANT</small>
          </span>
        </a>

        <p className="sidebar-label">WORKSPACE</p>

        <a className="nav-item active" href="#home">
          <span>▦</span> Dashboard
        </a>

        <a className="nav-item" href="#menu">
          <span>☷</span> Menu Management
        </a>

        <a className="nav-item" href="#add-dish">
          <span>＋</span> Add a Dish
        </a>

        <div className="sidebar-bottom">
          <span className="online-dot" />
          <span>Database connected</span>
          <p>Restaurant Menu Manager</p>
        </div>
      </aside>

      <main className="main-content" id="home">
        <header className="topbar">
          <div>
            <p className="breadcrumb">WORKSPACE / MENU</p>
            <p className="topbar-caption">Your culinary collection</p>
          </div>

          <a className="topbar-button" href="#add-dish">
            + Add New Dish
          </a>
        </header>

        <section className="welcome-banner">
          <div className="welcome-content">
            <p className="eyebrow">THE ART OF GOOD FOOD</p>
            <h1>
              A taste of <em>elegance,</em> on every plate.
            </h1>
            <p className="welcome-description">
              Organise your dishes, curate your offerings, and keep
              your restaurant menu up to date.
            </p>
            <a href="#menu" className="banner-button">
              Explore your menu <span>→</span>
            </a>
          </div>

          <div className="banner-decoration" aria-hidden="true">
            <span className="decoration-ring ring-one" />
            <span className="decoration-ring ring-two" />
            <span className="decoration-star">✳</span>
            <span className="decoration-text">EST. WITH LOVE</span>
          </div>
        </section>

        <section className="stats-grid">
          <article className="stat-card">
            <div className="stat-icon plum-icon">☷</div>
            <p>Total Dishes</p>
            <h2>{dishes.length}</h2>
            <span className="stat-note">In your collection</span>
          </article>

          <article className="stat-card">
            <div className="stat-icon sage-icon">✓</div>
            <p>Available Dishes</p>
            <h2>{dishes.filter((dish) => dish.available).length}</h2>
            <span className="stat-note">Ready to order</span>
          </article>

          <article className="stat-card">
            <div className="stat-icon copper-icon">₹</div>
            <p>Menu Categories</p>
            <h2>{new Set(dishes.map((dish) => dish.category)).size}</h2>
            <span className="stat-note">Unique categories</span>
          </article>
        </section>

        <section className="form-panel" id="add-dish">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">
                {editingId ? "REFINE YOUR CREATION" : "GROW YOUR COLLECTION"}
              </p>
              <h2>{editingId ? "Edit your dish" : "Add a new dish"}</h2>
              <p>Every great menu begins with a great dish.</p>
            </div>
            <span className="heading-star">✳</span>
          </div>

          <form className="dish-form" onSubmit={handleSubmit}>
            <label>
              Dish name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Truffle Mushroom Risotto"
                required
                maxLength={100}
              />
            </label>

            <label>
              Category
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="Starter">Starter</option>
                <option value="Main">Main Course</option>
                <option value="Dessert">Dessert</option>
              </select>
            </label>

            <label className="description-field">
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the flavours, ingredients and character..."
                required
                maxLength={500}
              />
            </label>

            <label>
              Price (₹)
              <div className="price-input">
                <span>₹</span>
                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
              </div>
            </label>

            <label className="availability-field">
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
              />
              <span className="custom-check">✓</span>
              <span>
                <strong>Available to order</strong>
                <small>Show this dish as available on your menu.</small>
              </span>
            </label>

            <div className="form-buttons">
              <button type="submit" className="primary-button">
                {editingId ? "Save Changes" : "Add to Menu"} <span>→</span>
              </button>

              {editingId && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {error && <div className="error-message">{error}</div>}

        <section className="menu-section" id="menu">
          <div className="menu-heading">
            <div>
              <p className="section-kicker">CURATED WITH CARE</p>
              <h2>Your menu collection</h2>
            </div>
            <span className="dish-count">{dishes.length} dishes</span>
          </div>

          <div className="menu-tools">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search your menu..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search dishes"
              />
            </div>

            <select
              className="filter-select"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label="Filter by category"
            >
              <option value="All">All Categories</option>
              <option value="Starter">Starter</option>
              <option value="Main">Main Course</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          {loading ? (
            <div className="empty-state">Loading your collection...</div>
          ) : filteredDishes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-symbol">✳</div>
              <h3>{dishes.length ? "No matching dishes" : "A blank canvas"}</h3>
              <p>
                {dishes.length
                  ? "Try another search or category."
                  : "Your next signature dish belongs here. Add your first dish above."}
              </p>
              {dishes.length === 0 && (
                <a href="#add-dish" className="empty-button">
                  + Create your first dish
                </a>
              )}
            </div>
          ) : (
            <div className="dish-grid">
              {filteredDishes.map((dish) => (
                <article className="dish-card" key={dish._id}>
                  <div className="dish-image-wrap">
                    <img
                      className="dish-image"
                      src={getFoodImage(dish)}
                      alt={dish.name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  <div className="dish-card-top">
                    <span className="category-tag">{dish.category}</span>
                    <span
                      className={
                        dish.available
                          ? "availability-status is-available"
                          : "availability-status is-unavailable"
                      }
                    >
                      <span className="status-dot" />
                      {dish.available ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  <div className="dish-card-body">
                    <h3>{dish.name}</h3>
                    <p className="dish-description">{dish.description}</p>
                    <p className="dish-price">
                      ₹{Number(dish.price).toFixed(2)}
                    </p>
                  </div>

                  <div className="dish-card-actions">
                    <button type="button" onClick={() => editDish(dish)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleAvailability(dish._id)}
                    >
                      {dish.available ? "Mark Unavailable" : "Mark Available"}
                    </button>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => deleteDish(dish._id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="footer">
          <span>
            MAISON <span className="footer-star">✳</span> RESTAURANT
          </span>
          <span>Crafted with care, served with love.</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
