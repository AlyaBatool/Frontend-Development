import { motion } from "framer-motion";
import "./App.css";

export default function App() {
  const assignmentTasks = [
    {
      id: 1,
      title: "Responsive Landing Page",
      desc: "A mobile-responsive UI featuring an updated split two-column hero design, structural grids, client testimonials, footer and smooth scrolling animations.",
      github: "https://github.com/AlyaBatool/Frontend-Development/tree/main/task1",
      live: "https://frontend-development-ht1k.vercel.app/"
    },
    {
      id: 2,
      title: "Animated UI Component",
      desc: "Interactive modular components built using Framer Motion primitives including a spring sidebar, modal transitions, and accordion drawers.",
      github: "https://github.com/AlyaBatool/Frontend-Development/tree/main/task2",
      live: "https://frontend-development-beige.vercel.app/"
    },
    {
     id: 3,
      title: "Admin Dashboard UI",
      desc: "A responsive control panel containing structural metric breakdown data displays, user management tables with pagination, and an integrated dark/light theme switch.",
      github: "https://github.com/AlyaBatool/Frontend-Development/tree/main/task3",
      live: "https://frontend-development-wjq3.vercel.app/"
    },
    {
    id: 4,
      title: "Multi-Step Form",
      desc: "A progressive user enrollment multi-stage form featuring inline input field validation criteria and localStorage tracking caches.",
      github: "https://github.com/AlyaBatool/Frontend-Development/tree/main/task4",
      live: "https://frontend-development-k18a.vercel.app/"
    },
    {
      id: 5,
      title: "Component Library",
      desc: "A modular frontend system built to isolate and document reusable base design elements like primary buttons, text inputs, and toast banners.",
      github: "https://github.com/AlyaBatool/Frontend-Development/tree/main/task5",
      live: "https://frontend-development-m3fc.vercel.app/"
    },
    {
      id: 6,
      title: "Real-Time UI",
      desc: "An asynchronous live application that connects cleanly to background server streams to instantly cycle charts and handle incoming network notification push alerts.",
      github: "https://github.com/AlyaBatool/Frontend-Development/tree/main/task6",
      live: "https://frontend-development-6662.vercel.app/"
    }
  ];

  return (
    <div className="portfolio-dashboard">
      
      {/* --- Responsive Navigation Header Bar --- */}
      <nav className="portfolio-nav">
        <div className="nav-container">
          <div className="nav-meta-block">
            <span className="brand-symbol">👤</span>
            <span className="student-name">Alya Batool</span>
          </div>
          <div className="nav-meta-block email-block">
            <span className="brand-symbol">📩</span>
            <span className="student-name">alya.batool118@gmail.com</span>
          </div>
          <span className="academic-tag">ID : NXAB100056</span>
        </div>
      </nav>

      {/* --- Hero Banner Section --- */}
      <header className="portfolio-hero">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-content-box"
        >
          <span className="hero-badge">Internship Tasks</span>
          <h1 className="hero-main-title">Frontend Development Tasks Dashboard</h1>
          <p className="hero-description-text">
            Welcome to my technical portfolio workspace. This dashboard showcases 
            six projects focused on responsive design, state management, working features, and 
            modern real-time user interfaces.
          </p>
        </motion.div>
      </header>

      {/* --- Main 6-Task Grid Section --- */}
      <main className="portfolio-workspace">
        <div className="workspace-container">
          <h2 className="grid-heading">Compiled Project Milestones</h2>
          
          <div className="tasks-grid-layout">
            {assignmentTasks.map((task, index) => (
              <motion.div 
                key={task.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="task-display-card"
              >
                <div className="card-identity-row">
                  <div className="task-icon-frame">🗃️</div>
                  <span className="task-sequence-tag">Task #0{task.id}</span>
                </div>

                <h3 className="task-title-text">{task.title}</h3>
                <p className="task-short-desc">{task.desc}</p>

                <div className="task-link-footer">
                  <a href={task.github} target="_blank" rel="noreferrer" className="action-link-btn btn-outline">
                    <span>💻 GitHub</span>
                  </a>
                  <a href={task.live} target="_blank" rel="noreferrer" className="action-link-btn btn-solid">
                    <span>Live Demo</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* --- Standard Student Footer --- */}
      <footer className="portfolio-footer">
        <div className="footer-container">
          <p className="footer-copyright-text">
            &copy; 2026 Alya. All rights reserved.
          </p>
          <p className="footer-sub-tag">Internship Tasks Dashboard</p>
        </div>
      </footer>

    </div>
  );
}