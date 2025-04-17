export const getAllTickets = () => {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    return tickets;
  };

