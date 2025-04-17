import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../Events/eventService';
import { getAllAttendees } from '../Attendees/attendeeService';
import { getAllTickets } from '../Tickets/ticketService';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import './Home.css';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [eventChartData, setEventChartData] = useState([]);
  const [ticketTypeData, setTicketTypeData] = useState([]);

  useEffect(() => {
    const fetchedEvents = getAllEvents();
    const fetchedAttendees = getAllAttendees();
    const fetchedTickets = getAllTickets();

    setEvents(fetchedEvents);
    setAttendees(fetchedAttendees);
    setTickets(fetchedTickets);

    // Events per month
    const eventCounts = {};
    fetchedEvents.forEach(event => {
      const month = new Date(event.date).toLocaleString('default', { month: 'short' });
      eventCounts[month] = (eventCounts[month] || 0) + 1;
    });

    const chartData = Object.entries(eventCounts).map(([month, count]) => ({
      name: month,
      events: count,
    }));
    setEventChartData(chartData);

    // Tickets by type
    const typeCounts = {};
    fetchedTickets.forEach(ticket => {
      const type = ticket.type || 'Unknown';
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    const pieData = Object.entries(typeCounts).map(([type, count]) => ({
      name: type,
      value: count,
    }));
    setTicketTypeData(pieData);
  }, []);

  const upcomingEvents = events
    .filter(event => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  return (
    <div className="home-container">
      <h1>🎉 Welcome to the Event Management Dashboard</h1>
      <p>Manage events, attendees, and tickets all in one place.</p>

      <div className="dashboard-cards">
        <div className="card event">
          <div className="icon">📅</div>
          <div>
            <h3>{events.length}</h3>
            <p>Events</p>
            <Link to="/create" className="action-btn">+ Create Event</Link>
          </div>
        </div>

        <div className="card attendee">
          <div className="icon">👥</div>
          <div>
            <h3>{attendees.length}</h3>
            <p>Attendees</p>
            <Link to="/attendees/register" className="action-btn">+ Register Attendee</Link>
          </div>
        </div>

        <div className="card ticket">
          <div className="icon">🎫</div>
          <div>
            <h3>{tickets.length}</h3>
            <p>Tickets Issued</p>
            <Link to="/tickets/issue" className="action-btn">+ Issue Ticket</Link>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3>📊 Events Per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventChartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="events" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>🎫 Ticket Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ticketTypeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#82ca9d"
                label
              >
                {ticketTypeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="upcoming-events">
        <h2>📅 Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <ul>
            {upcomingEvents.map(event => (
              <li key={event.id}>
                <strong>{event.name}</strong> - {new Date(event.date).toLocaleDateString()}
                <Link to={`/events/${event.id}`} className="view-details-btn">View Details</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming events</p>
        )}
      </div>
    </div>
  );
};

export default Home;
