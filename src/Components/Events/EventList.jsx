import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './EventList.css';

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(savedEvents);
  }, []);

  const handleDelete = (id) => {
    const updated = events.filter((e) => e.id !== id);
    localStorage.setItem('events', JSON.stringify(updated));
    setEvents(updated);
  };

  return (
    <div className="event-list-container">
      <h3>📋 Event List</h3>

      <table className="event-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-events">No events found.</td>
            </tr>
          ) : (
            events.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.location}</td>
                <td>{event.date}</td>
                <td>{event.capacity}</td>
                <td>
                  <Link to={`/events/${event.id}`} className="action-link">View</Link>
                  <Link to={`/events/${event.id}/edit`} className="action-link">Edit</Link>
                  <button onClick={() => handleDelete(event.id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EventList;
