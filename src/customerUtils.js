const findCustomerBookings = (bookingsData, user) => {
  let userBookings = bookingsData.filter(booking => {
    return booking.userID === user.id;
  })
  return userBookings;
}

export {
  findCustomerBookings
}