const findCustomerBookings = (bookingsData, user) => {
  let userBookings = bookingsData.filter(booking => {
    return booking.userID === user.id;
  })
  return userBookings;
}

const calculateBookingsCost = (roomsData, bookedRooms) => {
  let bookedRoomNumbers = bookedRooms.map(booking => {
    return booking.roomNumber;
  })

  return bookedRoomNumbers.reduce((cost, roomNumber) => {
    let totalCost = cost += roomsData[roomNumber - 1].costPerNight
    return totalCost
  }, 0)
}

export {
  findCustomerBookings,
  calculateBookingsCost
}