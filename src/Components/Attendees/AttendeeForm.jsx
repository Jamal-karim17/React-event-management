import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // For handling the edit
import './AttendeeForm.css';

const AttendeeForm = ({ onAttendeeAdded, onAttendeeEdited }) => {
  const { attendeeId } = useParams(); // Get the ID of the attendee to edit
  const navigate = useNavigate();
  
  const [attendee, setAttendee] = useState({
    name: '',
    email: '',
    phone: '',
    idCard: '',
    eventId: ''
  });

  const [events, setEvents] = useState([]);

  // Populate the form with data if editing an attendee
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);

    // If we're editing an attendee, populate the form with the existing data
    if (attendeeId) {
      const storedAttendees = JSON.parse(localStorage.getItem('attendees')) || [];
      const attendeeToEdit = storedAttendees.find(a => a.id === parseInt(attendeeId));
      if (attendeeToEdit) {
        setAttendee({
          name: attendeeToEdit.name,
          email: attendeeToEdit.email,
          phone: attendeeToEdit.phone,
          idCard: attendeeToEdit.idCard,
          eventId: attendeeToEdit.eventId
        });
      }
    }
  }, [attendeeId]);

  const handleChange = (e) => {
    setAttendee({ ...attendee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('attendees')) || [];
    let updated = [];

    if (attendeeId) {
      // Editing an existing attendee
      updated = existing.map(a => (a.id === parseInt(attendeeId) ? { ...attendee, id: a.id } : a));
    } else {
      // Creating a new attendee
      const newAttendee = { ...attendee, id: Date.now() };
      updated = [...existing, newAttendee];
    }

    localStorage.setItem('attendees', JSON.stringify(updated));
    alert(attendeeId ? 'Attendee updated!' : 'Attendee registered!');

    // Notify parent component (AttendeesList) about the new or updated attendee
    if (attendeeId && onAttendeeEdited) {
      onAttendeeEdited(attendee);
    } else if (!attendeeId && onAttendeeAdded) {
      onAttendeeAdded(attendee);
    }

    navigate('/attendees/list'); // Redirect to attendees list after submitting
  };

  return (
    <div className="attendee-form-container">
      <h2>{attendeeId ? '📝 Edit Attendee' : '🧍 Register Attendee'}</h2>
      <form className="attendee-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={attendee.name}
            onChange={handleChange}
            required
            placeholder="Enter full name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={attendee.email}
            onChange={handleChange}
            required
            placeholder="Enter email address"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={attendee.phone}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
          />
        </div>

        <div className="form-group">
          <label>ID Card Number</label>
          <input
            type="text"
            name="idCard"
            value={attendee.idCard}
            onChange={handleChange}
            required
            placeholder="Enter ID card number"
          />
        </div>

        <div className="form-group">
          <label>Select Event</label>
          <select
            name="eventId"
            value={attendee.eventId}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose Event --</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name} ({event.location})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">{attendeeId ? 'Save Changes' : 'Register'}</button>
      </form>
    </div>
  );
};

export default AttendeeForm;
