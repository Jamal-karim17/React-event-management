import { useParams, Link } from 'react-router-dom';
import './EventDetails.css';

function EventDetails() {
  const { id } = useParams();
  const events = JSON.parse(localStorage.getItem('events')) || [];
  const event = events.find((event) => event.id.toString() === id);

  if (!event) {
    return <p className="event-not-found">❌ Event not found!</p>;
  }

  return (
    <div className="event-details-card">
      <h3>Event Details</h3>
      <div className="detail-item">
        <strong>Name:</strong> {event.name}
      </div>
      <div className="detail-item">
        <strong>Location:</strong> {event.location}
      </div>
      <div className="detail-item">
        <strong>Date:</strong> {event.date}
      </div>
      <div className="detail-item">
        <strong>Capacity:</strong> {event.capacity}
      </div>

      <Link to={`/events/${event.id}/edit`} className="edit-link">
        <button className="edit-button">Edit Event</button>
      </Link>
    </div>
  );
}

export default EventDetails;
