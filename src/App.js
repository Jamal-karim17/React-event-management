import { Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Layout/Sidebar';
import Home from './Components/Home/Home';

import Events from './pages/Events';
import EventForm from './Components/Events/EventForm';
import EventList from './Components/Events/EventList';
import EventDetails from './Components/Events/EventDetails';
import EditEvent from './Components/Events/EditEvent';

import Attendees from './pages/Attendees';
import AttendeeForm from './Components/Attendees/AttendeeForm';
import AttendeesList from './Components/Attendees/AttendeesList';

import Ticket from './pages/Ticket'; 
import Tickets from './Components/Tickets/Tickets';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '240px', padding: '1rem', width: '100%' }}>
        <Routes>

           {/* Home Page */}
           <Route path="/dashboard" element={<Home />} />
          {/* Event Routes */}
          <Route path="/" element={<Events />}>
            <Route index element={<EventList />} />
            <Route path="create" element={<EventForm />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route path="events/:id/edit" element={<EditEvent />} />
          </Route>

          {/* Attendee Routes */}
          <Route path="/attendees" element={<Attendees />} />
          <Route path="/attendees/register" element={<AttendeeForm />} />
          <Route path="/attendees/list" element={<AttendeesList />} />
          <Route path="/attendees/edit/:attendeeId" element={<AttendeeForm />} />

          {/* Ticket Routes */}
          <Route path="/tickets" element={<Ticket />} />
          <Route path="/tickets/issue" element={<Tickets />} />

        
        </Routes>
      </div>
    </div>
  );
}

export default App;
