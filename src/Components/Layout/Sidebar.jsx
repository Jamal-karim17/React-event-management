import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>🎟️ Event System</h2>
      <nav>
        <ul>
          <li className="menu-header">🏠 Home</li>
          <ul className="submenu">
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>

          <li className="menu-header">📅 Events</li>
          <ul className="submenu">
            <li><Link to="/events/list">Event List</Link></li>
          </ul>

          <li className="menu-header">👥 Attendees</li>
          <ul className="submenu">
            <li><Link to="/attendees/register">Register Attendee</Link></li>
            <li><Link to="/attendees/list">View Attendees</Link></li>
          </ul>

          <li className="menu-header">🎫 Tickets</li>
          <ul className="submenu">
            <li><Link to="/tickets/issue">Issue Ticket</Link></li>
          </ul>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
