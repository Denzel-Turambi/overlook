const checkAvailability = (roomsData, bookingsData, userDateValue) => {
  const date = userDateValue.split('-').join('/');
const newBookings = bookingsData.reduce((acc, booking) => {
    if(booking.date === date) {
      acc.push(booking.roomNumber)
    }
    return acc;
  }, []);
  
  let foundRooms = roomsData.filter(room => {
    return !newBookings.includes(room.number);
  })
  return foundRooms;
}

export {
  checkAvailability
}