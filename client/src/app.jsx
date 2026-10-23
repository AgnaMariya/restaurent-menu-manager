
import { useState } from "react";
import Dashboard from "./Dashboard";
import "./App.css";

const featuredDishes = [
  {
    name: "Royal Biryani",
    category: "SIGNATURE SPECIALTY",
    description:
      "Fragrant rice, aromatic spices and a feast of flavour.",
    image:
  "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=900&q=85",
    alt: "Aromatic biryani served in a bowl",
  },
  {
    name: "Italian Comfort",
    category: "MADE WITH CARE",
    description:
      "Beautifully prepared pasta with a comforting touch.",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
    alt: "Fresh pasta with herbs",
  },
  {
    name: "Golden Indulgence",
    category: "SOMETHING SWEET",
    description:
      "A delightful dessert for the perfect finishing touch.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
    alt: "Layered chocolate cake",
  },
];

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return (
      <div className="rf-dashboard-page">
        <button
          type="button"
          className="rf-back-home"
          onClick={() => {
            setShowDashboard(false);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        >
          <span aria-hidden="true">←</span> Back to Home
        </button>

        <Dashboard />
      </div>
    );
  }

  return (
    <div className="rf-home">
      {/* Navigation */}
      <header className="rf-navbar">
        <a className="rf-brand" href="#home" aria-label="Royal Feast home">
          <span className="rf-brand-mark">R</span>

          <span className="rf-brand-copy">
            ROYAL FEAST
            <small>DINING · FLAVOUR · MOMENTS</small>
          </span>
        </a>

        <nav className="rf-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#specialties">Our Menu</a>
          <a href="#about">Our Story</a>
        </nav>

        <button
          type="button"
          className="rf-button rf-nav-button"
          onClick={() => setShowDashboard(true)}
        >
          Manage Menu <span aria-hidden="true">↗</span>
        </button>
      </header>

      <main>
        {/* Hero */}
        <section className="rf-hero" id="home">
          <div className="rf-hero-copy">
            <p className="rf-eyebrow">
              A CELEBRATION OF GOOD FOOD
            </p>

            <h1>
              Every Dish
              <br />
              Tells a <em>Story.</em>
            </h1>

            <div className="rf-gold-rule" />

            <p className="rf-hero-description">
              Discover thoughtful creations, wonderful ingredients
              and memorable flavours. At Royal Feast, every plate
              is prepared to make an ordinary moment feel special.
            </p>

            <div className="rf-hero-actions">
              <button
                type="button"
                className="rf-button rf-primary-button"
                onClick={() => setShowDashboard(true)}
              >
                Discover Our Menu <span aria-hidden="true">↗</span>
              </button>

              <a className="rf-text-link" href="#about">
                Our philosophy <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="rf-hero-note">
              <span className="rf-note-star">✦</span>
              <span>Thoughtfully prepared. Beautifully served.</span>
            </div>
          </div>

          <div className="rf-hero-visual">
            <div className="rf-photo-frame">
              <img
  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=85"
  alt="Elegant fine dining table with beautifully presented food"
  className="rf-hero-image"
/>

              <div className="rf-photo-overlay">
                <span>THE ROYAL FEAST EXPERIENCE</span>
                <span>GOOD FOOD · GOOD COMPANY</span>
              </div>
            </div>

            <div className="rf-image-stamp" aria-hidden="true">
              <span>MADE</span>
              <span>WITH</span>
              <strong>♥</strong>
            </div>

            <span className="rf-vertical-caption">
              AN EXPERIENCE TO REMEMBER
            </span>
          </div>
        </section>

        {/* Decorative introduction */}
        <section className="rf-introduction">
          <span className="rf-intro-symbol" aria-hidden="true">
            ✦
          </span>

          <p className="rf-eyebrow">A TABLE FULL OF POSSIBILITIES</p>

          <h2>
            Crafted with care.
            <br />
            <em>Remembered with joy.</em>
          </h2>

          <p>
            From comforting favourites to little moments of indulgence,
            discover food that brings people together.
          </p>
        </section>

        {/* Featured dishes */}
        <section className="rf-specialties" id="specialties">
          <div className="rf-section-heading">
            <div>
              <p className="rf-eyebrow">A FEW OF OUR FAVOURITES</p>
              <h2>
                A taste of <em>something special.</em>
              </h2>
            </div>

            <button
              type="button"
              className="rf-button rf-secondary-button"
              onClick={() => setShowDashboard(true)}
            >
              Explore All Dishes <span aria-hidden="true">↗</span>
            </button>
          </div>

          <div className="rf-dish-grid">
            {featuredDishes.map((dish, index) => (
              <article className="rf-dish-card" key={dish.name}>
                <div className="rf-dish-image-wrap">
                  <img
                    src={dish.image}
                    alt={dish.alt}
                    className="rf-dish-image"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.visibility = "hidden";
                    }}
                  />

                  <span className="rf-dish-number">
                    0{index + 1}
                  </span>
                </div>

                <div className="rf-dish-info">
                  <p className="rf-dish-category">{dish.category}</p>
                  <h3>{dish.name}</h3>
                  <p className="rf-dish-description">
                    {dish.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="rf-menu-note">
            Explore the full menu to see your restaurant's actual dishes
              and manage their details.
          </p>

          <button
            type="button"
            className="rf-button rf-primary-button rf-bottom-button"
            onClick={() => setShowDashboard(true)}
          >
            Open Restaurant Menu <span aria-hidden="true">↗</span>
          </button>
        </section>

        {/* About */}
        <section className="rf-about" id="about">
          <div className="rf-about-decoration" aria-hidden="true">
            RF
          </div>

          <div className="rf-about-content">
            <p className="rf-eyebrow">THE HEART OF ROYAL FEAST</p>

            <h2>
              More than a meal.
              <br />
              <em>A moment to cherish.</em>
            </h2>

            <p>
              We believe a memorable meal is made of more than
              ingredients. It is the care behind every creation,
              the beauty of a shared table and the joy of discovering
              a new favourite.
            </p>

            <button
              type="button"
              className="rf-button rf-light-button"
              onClick={() => setShowDashboard(true)}
            >
              Discover Our Dishes <span aria-hidden="true">↗</span>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="rf-footer" id="contact">
        <a className="rf-brand rf-footer-brand" href="#home">
          <span className="rf-brand-mark">R</span>

          <span className="rf-brand-copy">
            ROYAL FEAST
            <small>DINING · FLAVOUR · MOMENTS</small>
          </span>
        </a>

        <p>Every dish tells a story.</p>

        <button
          type="button"
          className="rf-footer-manage"
          onClick={() => setShowDashboard(true)}
        >
          Restaurant Management <span aria-hidden="true">↗</span>
        </button>

        <div className="rf-footer-bottom">
          <span>© {new Date().getFullYear()} Royal Feast</span>
          <span>Thoughtfully prepared, with care.</span>
        </div>
      </footer>
    </div>
  );
}
