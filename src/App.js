import React, { useState } from "react";
import {
  Menu,
  X,
  User,
  Settings,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle responsive design
  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // Auto-close sidebar on mobile
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-8 h-8 text-blue-500"
          >
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            />
          </svg>
          {sidebarOpen && (
            <span className="text-xl font-bold text-white">MyApp</span>
          )}
        </div>

        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="text-white hover:bg-gray-700 rounded-full p-1"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="text-white hover:bg-gray-700 rounded-full p-1"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-6 h-6" />
            ) : (
              <ChevronRight className="w-6 h-6" />
            )}
          </button>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2">
          {[
            { icon: <User className="w-5 h-5 mr-3" />, label: "Profile" },
            { icon: <Settings className="w-5 h-5 mr-3" />, label: "Settings" },
            { icon: <Bell className="w-5 h-5 mr-3" />, label: "Notifications" },
            { icon: <LogOut className="w-5 h-5 mr-3" />, label: "Logout" },
          ].map((item, index) => (
            <li
              key={index}
              className="px-3 py-2 hover:bg-gray-700 rounded cursor-pointer flex items-center text-white"
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </li>
          ))}
        </ul>
      </nav>

      {/* Profile Section */}
      {sidebarOpen && (
        <div className="p-4 border-t border-gray-700 flex items-center">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="flex-1">
            <p className="text-white font-semibold">Rohith Raj</p>
            <p className="text-gray-400 text-sm">Admin</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          bg-gray-800 text-white 
          fixed md:relative top-0 left-0 
          h-full z-50 
          transition-all duration-300 ease-in-out
          ${
            isMobile
              ? sidebarOpen
                ? "translate-x-0 w-64"
                : "-translate-x-full"
              : sidebarOpen
              ? "w-64"
              : "w-16"
          }
        `}
      >
        <SidebarContent />
      </div>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-gray-700 text-white">
          {/* Mobile Menu Toggle */}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="mr-4 hover:bg-gray-600 rounded-full p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          {/* Page Title */}
          <div className="text-xl font-semibold flex-1">Dashboard</div>

          {/* Profile Icon */}
          <div className="cursor-pointer">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1">
          <h1 className="text-3xl font-semibold mb-4">
            Welcome to the Dashboard
          </h1>
          <p>This is a responsive sidebar layout with toggle functionality.</p>
        </main>
      </div>
    </div>
  );
};

export default App;
