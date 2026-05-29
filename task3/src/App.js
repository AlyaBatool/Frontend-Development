//Admin Dashboard UI using ReactJs

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Settings, 
  Sun, 
  Moon, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";
import "./App.css";

// Example Data for Charts
const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
];

// Example Data for User Table
const userData = [
  { id: 1, name: "Florence", email: "florence@ex.com", role: "Admin", status: "Active" },
  { id: 2, name: "Natalia", email: "natalia@ex.com", role: "Editor", status: "Inactive" },
  { id: 3, name: "Amelia", email: "amelia@ex.com", role: "Viewer", status: "Active" },
  { id: 4, name: "Harry", email: "harry@ex.com", role: "Editor", status: "Active" },
  { id: 5, name: "Jasmine", email: "jasmine@ex.com", role: "Viewer", status: "Inactive" },
  { id: 6, name: "Tom", email: "tom@ex.com", role: "Viewer", status: "Active" },
  { id: 7, name: "Karen", email: "karen@ex.com", role: "Editor", status: "Active" },
];

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Toggle Theme Class on Body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userData.length / itemsPerPage);

  return (
    <div className={`dashboard-layout ${sidebarOpen ? "sidebar-visible" : "sidebar-hidden"}`}>
      
      {/* --- Sidebar Navigation --- */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <h2>AdminPanel</h2>
          <button className="mobile-close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <nav className="sidebar-menu">
          <p href="#" className="menu-item active">
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </p>
          <p href="#" className="menu-item">
            <Users size={20} /> <span>Users</span>
          </p>
          <p href="#" className="menu-item">
            <ShoppingBag size={20} /> <span>Products</span>
          </p>
          <p href="#" className="menu-item">
            <Settings size={20} /> <span>Settings</span>
          </p>
        </nav>
      </aside>

    
      <div className="main-wrapper">
        
       {/*Top Nav Bar*/}
        <header className="top-navbar">
          <button className="toggle-sidebar-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={24} />
          </button>
          
          <button className="theme-toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {/* --- Dashboard Content Panel --- */}
        <main className="content-panel">
          <h1 className="page-title">Dashboard Overview</h1>

          {/* Metric Overview Cards */}
          <div className="metrics-grid">
            <div className="metric-card">
              <h3>Total Revenue</h3>
              <p className="metric-value">$52,690</p>
            </div>
            <div className="metric-card">
              <h3>Active Users</h3>
              <p className="metric-value">1,476</p>
            </div>
            <div className="metric-card">
              <h3>Target of Sales</h3>
              <p className="metric-value">81%</p>
            </div>
          </div>

          {/*This is the chart section*/}
          <div className="chart-card">
            <h3>Revenue Analytics (Past 6 Months)</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" />
                  <YAxis stroke="var(--text-muted)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--card-bg)", 
                      borderColor: "var(--border-color)",
                      color: "var(--text-main)" 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="var(--primary-color)" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

           {/*This is the Table Section with Pagination*/}
          <div className="table-card">
            <h3>User Management</h3>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user) => (
                    <tr key={user.id}>
                      <td><strong>{user.name}</strong></td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <span className={`status-badge ${user.status.toLowerCase()}`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          {/*Pagination Controls*/}
            <div className="pagination-wrapper">
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <div className="pagination-buttons">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="page-btn"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="page-btn"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
