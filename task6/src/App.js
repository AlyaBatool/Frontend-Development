// //Real-time UI using ReactJs

// import { useState, useEffect, useRef } from "react";
// import { Bell, Wifi, WifiOff, RefreshCw, Send, CheckCircle2, Trash2 } from "lucide-react";
// import "./App.css";

// const MOCK_WS_URL = "wss://echo.websocket.events";

// export default function RealTimeUI() {
//   const [status, setStatus] = useState("Connecting");
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [liveData, setLiveData] = useState([
//     { id: 101, metric: "System Load", value: "17%", timestamp: "Just now" },
//     { id: 102, metric: "Memory Usage", value: "64%", timestamp: "Just now" },
//   ]);
//   const [inputText, setInputText] = useState("");
//   const [showPanel, setShowPanel] = useState(true); // Keeping open for better visualization
  
//   const ws = useRef(null);

//   useEffect(() => {
//   // Move the function inside here
//   const connectWebSocket = () => {
//     setStatus("Connecting");
//     ws.current = new WebSocket(MOCK_WS_URL);

//     ws.current.onopen = () => {
//       setStatus("Connected");
//       ws.current.send("echo hello");
//       triggerSystemNotification("Secure live streaming connection established.", "system");
//     };

//     ws.current.onmessage = (event) => {
//       const receivedText = event.data;
//       if (receivedText.includes("echo.websocket.events") && !receivedText.includes("hello")) return;

//       updateLiveTable();
//       triggerSystemNotification(`Data update received: "${receivedText}"`, "update");
//     };

//     ws.current.onclose = () => setStatus("Disconnected");
//     ws.current.onerror = () => setStatus("Disconnected");
//   };

//   // Call it right after declaring it
//   connectWebSocket();

//   return () => {
//     if (ws.current) ws.current.close();
//   };
// }, []);

//   const updateLiveTable = () => {
//     setLiveData((prevData) => {
//       const updated = [...prevData];
//       updated[0] = { ...updated[0], value: `${Math.floor(Math.random() * 30) + 10}%`, timestamp: "Updated live" };
//       updated[1] = { ...updated[1], value: `${Math.floor(Math.random() * 40) + 30}%`, timestamp: "Updated live" };
//       return updated;
//     });
//   };

//   const triggerSystemNotification = (message, type) => {
//     const newNotif = {
//       id: Date.now(),
//       text: message,
//       time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
//       type: type
//     };
//     setNotifications((prev) => [newNotif, ...prev]);
//     setUnreadCount((prev) => prev + 1);
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     // Safety check fallback to update UI even if socket lags briefly
//     if (!inputText.trim()) return;

//     if (ws.current && ws.current.readyState === WebSocket.OPEN) {
//       ws.current.send(inputText);
//     } else {
//       // Fallback local echo mode if the public server is blocked by a network firewall
//       updateLiveTable();
//       triggerSystemNotification(`Local Broadcast (Offline Fallback): "${inputText}"`, "update");
//     }

//     setInputText("");
//   };

//   const clearNotifications = () => {
//     setNotifications([]);
//     setUnreadCount(0);
//   };

//   return (
//     <div className="realtime-page">
//       <header className="realtime-header">
//         <div className="brand-zone">
//           <h1>LiveMetrics</h1>
//           <div className={`status-pill ${status.toLowerCase()}`}>
//             {status === "Connected" ? <Wifi size={14} /> : <WifiOff size={14} />}
//             <span>{status}</span>
//           </div>
//         </div>

//         <div className="header-actions">
//           <button className="notif-bell-btn" onClick={() => { setShowPanel(!showPanel); setUnreadCount(0); }}>
//             <Bell size={22} />
//             {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
//           </button>
//         </div>
//       </header>

//       <div className="realtime-content-grid">
//         <main className="main-feed-area">
//           <div className="control-card">
//             <h2>Stream WebSocket Event Payload</h2>
//             <p>Type a custom message below to send it across the live WebSocket pipe. The echo server will immediately broadcast it back, triggering a safe runtime refresh loop.</p>
            
//             <form onSubmit={handleSendMessage} className="message-form">
//               <input 
//                 type="text" 
//                 placeholder="Type real-time event marker text..." 
//                 value={inputText}
//                 onChange={(e) => setInputText(e.target.value)}
//               />
//               <button type="submit" className="send-btn">
//                 <Send size={16} /> <span>Broadcast</span>
//               </button>
//             </form>
//           </div>

//           <div className="data-display-card">
//             <div className="card-header-row">
//               <h2>Dynamic Machine Status</h2>
//               <div className="refresh-status-indicator">
//                 <RefreshCw size={14} className="spin-sync-icon" />
//                 <span>Auto-refresh pipeline active</span>
//               </div>
//             </div>

//             <div className="table-wrapper">
//               <table className="live-table">
//                 <thead>
//                   <tr>
//                     <th>Metric Parameter</th>
//                     <th>Runtime Value</th>
//                     <th>Refresh Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {liveData.map((row) => (
//                     <tr key={row.id}>
//                       <td><strong>{row.metric}</strong></td>
//                       <td className="live-value-txt">{row.value}</td>
//                       <td><span className="live-badge">{row.timestamp}</span></td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>

//         <aside className={`notification-sidebar-panel ${showPanel ? "panel-open" : "panel-closed"}`}>
//           <div className="panel-header">
//             <h3>Live Activity Feed</h3>
//             {notifications.length > 0 && (
//               <button className="clear-btn" onClick={clearNotifications}>
//                 <Trash2 size={14} /> Clear All
//               </button>
//             )}
//           </div>

//           <div className="notifications-list-container">
//             {notifications.length === 0 ? (
//               <div className="empty-notif-state">
//                 <CheckCircle2 size={36} />
//                 <p>No new server broadcast log alerts recorded yet.</p>
//               </div>
//             ) : (
//               notifications.map((notif) => (
//                 <div key={notif.id} className={`notif-alert-item ${notif.type}`}>
//                   <p className="notif-text">{notif.text}</p>
//                   <span className="notif-time">{notif.time}</span>
//                 </div>
//               ))
//             )}
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }
//Real-time UI using ReactJs
import { useState, useEffect, useRef } from "react";
import { Bell, Wifi, WifiOff, RefreshCw, Send, CheckCircle2, Trash2 } from "lucide-react";
import "./App.css";

const MOCK_WS_URL = "wss://echo.websocket.events";

export default function RealTimeUI() {
  const [status, setStatus] = useState("Connecting");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [liveData, setLiveData] = useState([
    { id: 101, metric: "System Load", value: "17%", timestamp: "Just now" },
    { id: 102, metric: "Memory Usage", value: "64%", timestamp: "Just now" },
  ]);
  const [inputText, setInputText] = useState("");
  const [showPanel, setShowPanel] = useState(false); // Default to false on mobile for cleaner workspace, toggleable via bell
  
  const ws = useRef(null);

  useEffect(() => {
    const connectWebSocket = () => {
      setStatus("Connecting");
      ws.current = new WebSocket(MOCK_WS_URL);

      ws.current.onopen = () => {
        setStatus("Connected");
        ws.current.send("echo hello");
        triggerSystemNotification("Secure live streaming connection established.", "system");
      };

      ws.current.onmessage = (event) => {
        const receivedText = event.data;
        if (receivedText.includes("echo.websocket.events") && !receivedText.includes("hello")) return;

        updateLiveTable();
        triggerSystemNotification(`Data update received: "${receivedText}"`, "update");
      };

      ws.current.onclose = () => setStatus("Disconnected");
      ws.current.onerror = () => setStatus("Disconnected");
    };

    connectWebSocket();

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  const updateLiveTable = () => {
    setLiveData((prevData) => {
      const updated = [...prevData];
      updated[0] = { ...updated[0], value: `${Math.floor(Math.random() * 30) + 10}%`, timestamp: "Updated live" };
      updated[1] = { ...updated[1], value: `${Math.floor(Math.random() * 40) + 30}%`, timestamp: "Updated live" };
      return updated;
    });
  };

  const triggerSystemNotification = (message, type) => {
    const newNotif = {
      id: Date.now(),
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      type: type
    };
    setNotifications((prev) => [newNotif, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(inputText);
    } else {
      updateLiveTable();
      triggerSystemNotification(`Local Broadcast (Offline Fallback): "${inputText}"`, "update");
    }

    setInputText("");
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <div className="realtime-page">
      <header className="realtime-header">
        <div className="brand-zone">
          <h1>LiveMetrics</h1>
          <div className={`status-pill ${status.toLowerCase()}`}>
            {status === "Connected" ? <Wifi size={14} /> : <WifiOff size={14} />}
            <span>{status}</span>
          </div>
        </div>

        <div className="header-actions">
          <button className="notif-bell-btn" onClick={() => { setShowPanel(!showPanel); setUnreadCount(0); }}>
            <Bell size={22} />
            {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
          </button>
        </div>
      </header>

      <div className="realtime-content-grid">
        <main className="main-feed-area">
          <div className="control-card">
            <h2>Stream WebSocket Event Payload</h2>
            <p>Type a custom message below to send it across the live WebSocket pipe. The echo server will immediately broadcast it back, triggering a safe runtime refresh loop.</p>
            
            <form onSubmit={handleSendMessage} className="message-form">
              <input 
                type="text" 
                placeholder="Type real-time event marker text..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="send-btn">
                <Send size={16} /> <span>Broadcast</span>
              </button>
            </form>
          </div>

          <div className="data-display-card">
            <div className="card-header-row">
              <h2>Dynamic Machine Status</h2>
              <div className="refresh-status-indicator">
                <RefreshCw size={14} className="spin-sync-icon" />
                <span>Auto-refresh pipeline active</span>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="live-table">
                <thead>
                  <tr>
                    <th>Metric Parameter</th>
                    <th>Runtime Value</th>
                    <th>Refresh Status</th>
                  </tr>
                </thead>
                <tbody>
                  {liveData.map((row) => (
                    <tr key={row.id}>
                      <td><strong>{row.metric}</strong></td>
                      <td className="live-value-txt">{row.value}</td>
                      <td><span className="live-badge">{row.timestamp}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <aside className={`notification-sidebar-panel ${showPanel ? "panel-open" : "panel-closed"}`}>
          <div className="panel-header">
            <h3>Live Activity Feed</h3>
            {notifications.length > 0 && (
              <button className="clear-btn" onClick={clearNotifications}>
                <Trash2 size={14} /> Clear All
              </button>
            )}
          </div>

          <div className="notifications-list-container">
            {notifications.length === 0 ? (
              <div className="empty-notif-state">
                <CheckCircle2 size={36} />
                <p>No new server broadcast log alerts recorded yet.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} className={`notif-alert-item ${notif.type}`}>
                  <p className="notif-text">{notif.text}</p>
                  <span className="notif-time">{notif.time}</span>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}