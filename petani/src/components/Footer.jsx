import React from "react";

const Footer = ({ isOpen, toggleSidebar, handleLogout }) => (
  <footer className="footer">
    {isOpen && <button onClick={toggleSidebar}>Close Sidebar</button>}
    <button onClick={handleLogout}>Logout</button>
  </footer>
);

export default Footer;
