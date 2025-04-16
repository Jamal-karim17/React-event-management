import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventForm.css';

function EventForm() {
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    name: '',
    location: '',
    date: '',
    capacity: '',
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const events = JSON.parse(localStorage.getItem('events')) || [];

    const newEvent = { ...event, id: Date.now() };
    events.push(newEvent);

    localStorage.setItem('events', JSON.stringify(events));

    alert('✅ Event created successfully!');
    navigate('/'); // Redirect to events list
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h2>Create New Event</h2>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={event.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input type="text" name="location" id="location" value={event.location} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input type="date" name="date" id="date" value={event.date} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="capacity">Capacity</label>
        <input type="number" name="capacity" id="capacity" value={event.capacity} onChange={handleChange} required />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default EventForm;
