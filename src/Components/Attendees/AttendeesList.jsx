import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For editing the attendee
import './AttendeesList.css';

const AttendeesList = () => {
  const [attendees, setAttendees] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch stored attendees and events from localStorage
    const storedAttendees = JSON.parse(localStorage.getItem('attendees')) || [];
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setAttendees(storedAttendees);
    setEvents(storedEvents);
  }, []);

  const handleDelete = (id) => {
    const updated = attendees.filter(attendee => attendee.id !== id);
    localStorage.setItem('attendees', JSON.stringify(updated));
    setAttendees(updated);
    alert('✅ Attendee deleted!');
  };

  const handleView = (attendee) => {
    setSelectedAttendee(attendee);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAttendee(null);
  };

  const getEventDetails = (eventId) => {
    // Convert eventId to number for comparison with event.id
    const event = events.find(e => e.id === Number(eventId));
    if (event) {
      return `${event.name} (${event.location})`; // Return event name and location
    }
    return 'Event not found'; // Fallback if event is not found
  };

  return (
    <div className="attendees-list-container">
      <h2>👥 Attendees List</h2>

      {attendees.length === 0 ? (
        <p>No attendees found.</p>
      ) : (
        <table className="attendees-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Event</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr key={attendee.id}>
                <td>{attendee.name}</td>
                <td>{attendee.email}</td>
                <td>{attendee.phone}</td>
                <td>{getEventDetails(attendee.eventId)}</td> {/* Display event details */}
                <td>
                  <button className="view-btn" onClick={() => handleView(attendee)}>View</button>
                  <Link to={`/attendees/edit/${attendee.id}`} className="edit-btn">Edit</Link>
                  <button className="delete-btn" onClick={() => handleDelete(attendee.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && selectedAttendee && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>🧍 Attendee Details</h3>
            <p><strong>Name:</strong> {selectedAttendee.name}</p>
            <p><strong>Email:</strong> {selectedAttendee.email}</p>
            <p><strong>Phone:</strong> {selectedAttendee.phone}</p>
            <p><strong>ID Card:</strong> {selectedAttendee.idCard}</p>
            <p><strong>Event:</strong> {getEventDetails(selectedAttendee.eventId)}</p> {/* Event name and location */}
            <button onClick={closeModal} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendeesList;
