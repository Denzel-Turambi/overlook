const checkAvailability = (roomsData, bookingsData, userDateValue) => {
  event.preventDefault()
  const date = userDateValue.split('-').join('/');
console.log('date', date)
const newBookings = bookingsData.reduce((acc, booking) => {
    console.log(booking.date)
    if(booking.date === date) {
      acc.push(booking.roomNumber)
    }
    return acc;
  }, []);
  console.log('1', newBookings)
  let foundRooms = roomsData.filter(room => {

    return !newBookings.includes(room.number);
  })
  return foundRooms;
}

export {
  checkAvailability
}