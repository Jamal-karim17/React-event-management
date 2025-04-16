import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditEvent.css';

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    name: '',
    location: '',
    date: '',
    capacity: '',
  });

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const existingEvent = events.find((e) => e.id.toString() === id);

    if (existingEvent) {
      setEvent(existingEvent);
    }
  }, [id]);

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const events = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = events.map((e) =>
      e.id.toString() === id ? { ...e, ...event } : e
    );

    localStorage.setItem('events', JSON.stringify(updatedEvents));

    alert('✅ Event updated successfully!');
    navigate(`/events/${id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-event-form">
      <h2>Edit Event</h2>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={event.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input type="text" id="location" name="location" value={event.location} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" value={event.date} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="capacity">Capacity</label>
        <input type="number" id="capacity" name="capacity" value={event.capacity} onChange={handleChange} required />
      </div>

      <button type="submit">Update Event</button>
    </form>
  );
}

export default EditEvent;
