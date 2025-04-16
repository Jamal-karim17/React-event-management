import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './Tickets.css';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({
    attendeeId: '',
    eventId: '',
    type: 'Regular'
  });

  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const storedAttendees = JSON.parse(localStorage.getItem('attendees')) || [];
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setTickets(storedTickets);
    setAttendees(storedAttendees);
    setEvents(storedEvents);
  }, []);

  const handleOpenModal = () => {
    setFormData({ attendeeId: '', eventId: '', type: 'Regular' });
    setSelectedTicket(null);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleOpenViewModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowViewModal(true);
  };
  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedTicket(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateTicketNumber = () => {
    return 'TKT-' + Math.floor(100000 + Math.random() * 900000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketNumber = generateTicketNumber();
    const newTicket = {
      id: selectedTicket?.id || Date.now(),
      ticketNumber: selectedTicket?.ticketNumber || ticketNumber,
      ...formData
    };

    let updatedTickets;
    if (selectedTicket) {
      updatedTickets = tickets.map((t) => (t.id === selectedTicket.id ? newTicket : t));
    } else {
      updatedTickets = [...tickets, newTicket];
    }

    setTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const updated = tickets.filter((t) => t.id !== id);
    setTickets(updated);
    localStorage.setItem('tickets', JSON.stringify(updated));
  };

  const handleEdit = (ticket) => {
    setFormData({
      attendeeId: ticket.attendeeId,
      eventId: ticket.eventId,
      type: ticket.type
    });
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const getAttendeeName = (id) => {
    return attendees.find((a) => a.id === parseInt(id))?.name || 'Unknown';
  };

  const getEventDetails = (id) => {
    const event = events.find((e) => e.id === parseInt(id));
    return event ? { name: event.name, location: event.location } : { name: 'Unknown', location: 'Unknown' };
  };

  return (
    <div className="ticket-page">
      <div className="ticket-header">
        <h2><i className="fa fa-ticket" aria-hidden="true"></i> Tickets</h2>
        <button onClick={handleOpenModal}>➕ Issue Ticket</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{selectedTicket ? 'Edit Ticket' : 'Issue New Ticket'}</h3>
            <form onSubmit={handleSubmit}>
              <label>Attendee</label>
              <select name="attendeeId" value={formData.attendeeId} onChange={handleChange} required>
                <option value="">-- Select Attendee --</option>
                {attendees.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>

              <label>Event</label>
              <select name="eventId" value={formData.eventId} onChange={handleChange} required>
                <option value="">-- Select Event --</option>
                {events.map((e) => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </select>

              <label>Ticket Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Regular">Regular</option>
                <option value="VIP">VIP</option>
                <option value="VVIP">VVIP</option>
              </select>

              <button type="submit">Save Ticket</button>
              <button type="button" onClick={handleCloseModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showViewModal && selectedTicket && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Ticket Details</h3>
            <p><strong>Ticket Number:</strong> {selectedTicket.ticketNumber}</p>
            <p><strong>Attendee:</strong> {getAttendeeName(selectedTicket.attendeeId)}</p>
            <p><strong>Event:</strong> {getEventDetails(selectedTicket.eventId).name}</p>
            <p><strong>Location:</strong> {getEventDetails(selectedTicket.eventId).location}</p>
            <p><strong>Ticket Type:</strong> {selectedTicket.type}</p>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <QRCodeSVG
                value={JSON.stringify(selectedTicket)}
                size={128}
                bgColor="#ffffff"
                fgColor="#000000"
              />
              <p style={{ fontSize: '12px', color: '#555' }}>Scan for ticket info</p>
            </div>

            <button onClick={handleCloseViewModal}>Close</button>
          </div>
        </div>
      )}

      <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket Number</th>
            <th>Type</th>
            <th>Attendee</th>
            <th>Event</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => {
            const eventDetails = getEventDetails(ticket.eventId);
            return (
              <tr key={ticket.id}>
                <td>{ticket.ticketNumber}</td>
                <td>{ticket.type}</td>
                <td>{getAttendeeName(ticket.attendeeId)}</td>
                <td>{eventDetails.name}</td>
                <td>{eventDetails.location}</td>
                <td>
                  <button onClick={() => handleOpenViewModal(ticket)}>View</button>
                  <button onClick={() => handleEdit(ticket)}>Edit</button>
                  <button onClick={() => handleDelete(ticket.id)}>Cancel</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tickets;
