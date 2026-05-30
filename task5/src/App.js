//Component Library using ReactJs
import { useState } from "react";
import { 
  Copy, 
  Check, 
  Layers, 
  MousePointer, 
  CreditCard, 
  Type, 
  Bell,
  AlertCircle,
  X
} from "lucide-react";
import "./App.css";

export default function ComponentLibrary() {
  const [activeSection, setActiveSection] = useState("buttons");
  const [copiedId, setCopiedId] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Toast Notification Dispatcher
  const showToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Code Snippet Copy Engine
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const codeSnippets = {
    buttons: `<button className="lib-btn btn-primary">Primary</button>\n<button className="lib-btn btn-secondary">Secondary</button>\n<button className="lib-btn btn-danger">Danger</button>`,
    cards: `<div className="lib-card">\n  <img src="placeholder.jpg" alt="Preview" className="lib-card-img" />\n  <div className="lib-card-body">\n    <h3>Card Title</h3>\n    <p>This is a reusable card canvas snippet...</p>\n  </div>\n</div>`,
    inputs: `<div className="lib-input-group">\n  <label>Email Field</label>\n  <input type="email" placeholder="you@example.com" />\n  <span className="lib-help-text">We won't share your email.</span>\n</div>`,
    toasts: `// Invoke via toast notification stack\nshowToast("Action completed successfully!", "success");`
  };

  return (
    <div className="lib-layout">
      
      {/* --- Documentation Sidebar Navigation --- */}
      <aside className="lib-sidebar">
        <div className="lib-sidebar-header">
          <Layers size={22} className="text-brand" />
          <h2>Component Library<span>v1.0</span></h2>
        </div>
        <nav className="lib-sidebar-menu">
          <span className="menu-category">Primitives</span>
          <button 
            className={`menu-btn ${activeSection === "buttons" ? "active" : ""}`}
            onClick={() => setActiveSection("buttons")}
          >
            <MousePointer size={16} /> Buttons
          </button>
          <button 
            className={`menu-btn ${activeSection === "cards" ? "active" : ""}`}
            onClick={() => setActiveSection("cards")}
          >
            <CreditCard size={16} /> Cards
          </button>
          <button 
            className={`menu-btn ${activeSection === "inputs" ? "active" : ""}`}
            onClick={() => setActiveSection("inputs")}
          >
            <Type size={16} /> Inputs
          </button>
          <button 
            className={`menu-btn ${activeSection === "toasts" ? "active" : ""}`}
            onClick={() => setActiveSection("toasts")}
          >
            <Bell size={16} /> Toasts
          </button>
        </nav>
      </aside>

      {/* --- Main Documentation Workspace Area --- */}
      <main className="lib-workspace">
        
        {/* BUTTONS DOCUMENTATION */}
        {activeSection === "buttons" && (
          <section className="doc-section">
            <h1 className="doc-title">Buttons</h1>
            <p className="doc-desc">Interactive button triggers used for actions, form submissions, and structural flows.</p>
            
            <div className="component-preview-box">
              <button className="lib-btn btn-primary">Primary Action</button>
              <button className="lib-btn btn-secondary">Secondary Variant</button>
              <button className="lib-btn btn-danger">Danger Alert</button>
            </div>

            <div className="code-snippet-box">
              <div className="snippet-header">
                <span>JSX / HTML Usage</span>
                <button onClick={() => copyToClipboard(codeSnippets.buttons, "btn")} className="copy-btn">
                  {copiedId === "btn" ? <Check size={14} /> : <Copy size={14} />}
                  {copiedId === "btn" ? "Copied" : "Copy Source"}
                </button>
              </div>
              <pre><code>{codeSnippets.buttons}</code></pre>
            </div>
          </section>
        )}

        {/* CARDS DOCUMENTATION */}
        {activeSection === "cards" && (
          <section className="doc-section">
            <h1 className="doc-title">Cards</h1>
            <p className="doc-desc">Flexible content containers designed to wrap media elements, textual summaries, and structured layouts.</p>
            
            <div className="component-preview-box">
              <div className="lib-card" style={{ maxWidth: "320px" }}>
                <div className="lib-card-img-placeholder">
                  <CreditCard size={40} className="text-muted" />
                </div>
                <div className="lib-card-body">
                  <span className="card-badge">New Release</span>
                  <h3>Vanilla CSS UI Component</h3>
                  <p>A pristine container abstraction layout built explicitly without complex framework architectures.</p>
                </div>
              </div>
            </div>

            <div className="code-snippet-box">
              <div className="snippet-header">
                <span>JSX / HTML Usage</span>
                <button onClick={() => copyToClipboard(codeSnippets.cards, "card")} className="copy-btn">
                  {copiedId === "card" ? <Check size={14} /> : <Copy size={14} />}
                  {copiedId === "card" ? "Copied" : "Copy Source"}
                </button>
              </div>
              <pre><code>{codeSnippets.cards}</code></pre>
            </div>
          </section>
        )}

        {/* INPUTS DOCUMENTATION */}
        {activeSection === "inputs" && (
          <section className="doc-section">
            <h1 className="doc-title">Inputs</h1>
            <p className="doc-desc">Controlled form input fields that support explicit label matching and textual validations.</p>
            
            <div className="component-preview-box block-flow">
              <div className="lib-input-group">
                <label htmlFor="example-email">Primary Input Label</label>
                <input type="email" id="example-email" placeholder="you@ex.com" />
                <span className="lib-help-text">Standard inline hint messaging placeholder rules.</span>
              </div>

              <div className="lib-input-group error">
                <label htmlFor="error-input">Invalid Form Target</label>
                <input type="text" id="error-input" defaultValue="Faulty parameters" />
                <span className="lib-help-text">
                  <AlertCircle size={12} /> This configuration format is invalid.
                </span>
              </div>
            </div>

            <div className="code-snippet-box">
              <div className="snippet-header">
                <span>JSX / HTML Usage</span>
                <button onClick={() => copyToClipboard(codeSnippets.inputs, "input")} className="copy-btn">
                  {copiedId === "input" ? <Check size={14} /> : <Copy size={14} />}
                  {copiedId === "input" ? "Copied" : "Copy Source"}
                </button>
              </div>
              <pre><code>{codeSnippets.inputs}</code></pre>
            </div>
          </section>
        )}

        {/* TOASTS DOCUMENTATION */}
        {activeSection === "toasts" && (
          <section className="doc-section">
            <h1 className="doc-title">Toasts</h1>
            <p className="doc-desc">Temporary overlay alerts used for asynchronous task completions and passive real-time status updates.</p>
            
            <div className="component-preview-box">
              <button className="lib-btn btn-primary" onClick={() => showToast("Success action log saved!", "success")}>
                Trigger Success Toast
              </button>
              <button className="lib-btn btn-danger" onClick={() => showToast("System runtime warning exception.", "error")}>
                Trigger Error Toast
              </button>
            </div>

            <div className="code-snippet-box">
              <div className="snippet-header">
                <span>Functional Integration Schema</span>
                <button onClick={() => copyToClipboard(codeSnippets.toasts, "toast")} className="copy-btn">
                  {copiedId === "toast" ? <Check size={14} /> : <Copy size={14} />}
                  {copiedId === "toast" ? "Copied" : "Copy Source"}
                </button>
              </div>
              <pre><code>{codeSnippets.toasts}</code></pre>
            </div>
          </section>
        )}
      </main>

      {/* --- Dynamic Toast Notification Rendering Stack Hub --- */}
      <div className="toast-portal-stack">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast-alert-node ${toast.type}`}>
            <span className="toast-message">{toast.message}</span>
            <button className="toast-close-btn" onClick={() => removeToast(toast.id)}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

