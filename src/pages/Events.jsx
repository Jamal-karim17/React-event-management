import { Link, Outlet } from 'react-router-dom';

function Events() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Events</h2>
      <Link to="create">➕ Create Event</Link>
      <Outlet />
    </div>
  );
}

export default Events;
