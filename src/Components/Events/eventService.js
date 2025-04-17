export const getAllEvents = () => {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    return events;
  };
  