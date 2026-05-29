//Responsive Landing Page using ReactJs

import { motion } from "framer-motion";
import { Sparkles, Heart, Star } from "lucide-react";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <HeroSection />
      <FeaturesGrid />
      <Testimonials />
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Bloomify</h1>
        <div className="navbar-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
          <a href="#footer" className="nav-link">Contact</a>
        </div>
      </div>
    </nav>
  );
}


//Hero Section
function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1 className="hero-title">
            <span className="text-highlight-purple">New Arrival</span>
          </h1>
          <p className="hero-subtitle">
            EVERYTHING NEW IN PRETTY GIFTING
          </p>
          <div className="hero-buttons">
            <a href="#features" className="btn btn-purple">
              Shop Now
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-image-wrapper"
        >
          <img 
            src="hero_image.jpg" 
            alt="New Arrivals Display Preview" 
            className="hero-display-img" 
          />
        </motion.div>

      </div>
    </section>
  );
}

//Features Grid
function FeaturesGrid() {
  const features = [
    {
      icon: <Sparkles className="icon-yellow" size={32} />,
      title: "Glowing Skin Care",
      desc: "Daily skincare products designed to hydrate, brighten, and give your skin a natural glow.",
    },
    {
      icon: <Heart className="icon-rose" size={32} />,
      title: "Natural Ingredients",
      desc: "Made with skin-friendly natural ingredients that nourish and protect your skin gently.",
    },
    {
      icon: <Star className="icon-pink" size={32} />,
      title: "Fast & Safe Delivery",
      desc: "Get your favorite skincare essentials delivered quickly with secure packaging.",
    },
  ];

  return (
    <section id="features" className="features-section">
      <div className="section-container text-center">
        <h2 className="section-title">Glow Naturally With Bloomify</h2>
        <p className="section-subtitle">Premium skincare products crafted to keep your skin healthy, hydrated, and naturally beautiful.</p>

        <div className="grid-layout">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="feature-card"
            >
              <div className="icon-wrapper">{feature.icon}</div>
              <h3 className="card-title">{feature.title}</h3>
              <p className="card-desc">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

//Testimonials
function Testimonials() {
  const reviews = [
    {
      name: "Natalia Harpar",
      text: "My skin feels softer and healthier after using Bloomify products.",
    },
    {
      name: "Florence",
      text: "The packaging and quality feel super premium.",
    },
    {
      name: "Amelia Wilow",
      text: "Products are so good, definitly buying again",
    },
  
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="section-container text-center">
        <h2 className="section-title">Testimonials</h2>

        <div className="grid-layout m-top-14">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="testimonial-card"
            >
              <p className="testimonial-text">“{review.text}”</p>
              <h4 className="testimonial-author">{review.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
//Footer
function Footer() {
  return (
    <footer id="footer" className="footer">
      <h2 className="footer-logo">Bloomify</h2>
      <p className="footer-text">A Premium Skin Care</p>

      <div className="footer-socials">
        <p className="footer-social-link">Instagram</p>
        <p className="footer-social-link">Facebook</p>
        <p className="footer-social-link">WhatsApp</p>
      </div>
      <p className="footer-copyright">© 2026 Bloomify. All rights reserved.</p>
    </footer>
  );
}
