import { bookings, currentUser, customers, rooms } from "./domUpdates"

const getAllCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then((response => response.json()))
    .then((data) => { return data })
    .catch((error) => alert(error))
}

const getSingleCustomer = () => {
  return fetch('http://localhost:3001/api/v1/customers/1')
    .then((response => response.json()))
    .then((data) => { return data })
    .catch((error) => alert(error))
}

const getAllRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then((response => response.json()))
    .then((data) => { return data })
    .catch((error) => alert(error))
}

const getAllBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then((response => response.json()))
    .then((data) => { return data })
    .catch((error) => alert(error))
}

const savePostBooking = (newBooking, currentUser) => {
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newBooking, currentUser)
  })
  .then(response => response.json())
  .catch(error => alert(error))
  }

export {
  getAllCustomers,
  getSingleCustomer,
  getAllRooms,
  getAllBookings,
  savePostBooking
}