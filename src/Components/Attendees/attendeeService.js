export const getAllAttendees = () => {
    const attendees = JSON.parse(localStorage.getItem('attendees')) || [];
    return attendees;
  };
  