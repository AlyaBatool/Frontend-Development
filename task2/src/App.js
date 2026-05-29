//Animated UI Components
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import "./App.css";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  //Accordian
 const accordionData = [
  {
    title: "Are Bloomify products suitable for sensitive skin?",
    content:
      "Yes, our products are made with gentle and skin-friendly ingredients suitable for most skin types.",
  },

  {
    title: "How long does delivery take?",
    content:
      "Orders are usually delivered within 3-5 business days depending on your location.",
  },

  {
    title: "Are your skincare products made with natural ingredients?",
    content:
      "Yes, Bloomify products are carefully crafted using natural ingredients to keep your skin healthy and hydrated.",
  },
];

  return (
    <section className="components-section">
      <div className="components-container text-center">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Everything you need to know about Bloomify skincare products.</p>

        <div className="button-group">
          <button onClick={() => setIsModalOpen(true)} className="btn btn-purple">
           Explore Skincare
          </button>
          <button onClick={() => setIsSidebarOpen(true)} className="btn btn-purple">
            Open Sidebar
          </button>
        </div>

        <div className="accordion-wrapper">
          {accordionData.map((item, index) => (
            <div key={index} className="accordion-item">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="accordion-header"
              >
                {item.title}
                <span>{openAccordion === index ? "−" : "+"}</span>
              </button>

              <AnimatePresence>
                {openAccordion === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="accordion-content"
                  >
                    {item.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="modal-container"
            >
              <div className="modal-header">
                <h3 className="modal-title">Start your Skin Care Journey</h3>
                <button onClick={() => setIsModalOpen(false)} className="close-btn">
                  <X />
                </button>
              </div>
              <p className="modal-body">
                Discover skincare products made with natural ingredients for healthy, glowing, and hydrated skin.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sidebar-overlay"
              onClick={() => setIsSidebarOpen(false)}
            />

            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="sidebar-container"
            >
              <div className="sidebar-header">
                <h3 className="sidebar-title">Sidebar</h3>
                <button onClick={() => setIsSidebarOpen(false)} className="close-btn">
                  <X />
                </button>
              </div>

              <div className="sidebar-links">
                <p href="#" className="sidebar-link">Home</p>
                <p href="#" className="sidebar-link">Dashboard</p>
                <p href="#" className="sidebar-link">Settings</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
