import { getAllBookings, getAllCustomers, getAllRooms, getSingleCustomer } from "./apiCalls";
import { checkAvailability } from "./bookingsUtils";
import { calculateBookingsCost, findCustomerBookings, findUserID } from "./customerUtils";
import { filterRoomType } from "./roomsUtils";
// Global Varialbes
let currentUser;
let bookings;
let customers;
let rooms;

// Query Selectors
// nav section
const navBar = document.querySelector('.nav-bar');
const newBookingButton = document.querySelector('.book-now-button');
const profileButton = document.querySelector('.profile-button');

// new bookings page
const bookNowPage = document.querySelector('.book-now-page');
const roomsAvailable = document.querySelector('.reservation-selection');
const dateSearchButton = document.querySelector('.room-search');
const dateInput = document.querySelector('#date-picker');
const roomFilterButton = document.querySelector('.filter-search');
const roomSelectInput = document.querySelector('.room-select')


// profile page/reservations dashboard
const profilePage = document.querySelector('.profile-page');
const pastReservations = document.querySelector('.past-reservations');
const totalSpentLabel = document.querySelector('.total-cost');

// login page
const loginPage = document.querySelector('.login-page');
const loginForm = document.querySelector('.login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const loginButton = document.querySelector('.login-button');

// Event Listeners
window.addEventListener('load', () => {
  Promise.all([getAllBookings(), getAllCustomers(), getSingleCustomer(), getAllRooms()]).then((data) => {
    console.log('whole data', data)
    bookings = data[0].bookings;
    currentUser = data[2];
    customers = data[1].customers;
    rooms = data[3].rooms;
  });
});

newBookingButton.addEventListener('click', function () {
  removeHiddenClass([bookNowPage]);
  addHiddenClass([profilePage]);
});

profileButton.addEventListener('click', function () {
  removeHiddenClass([profilePage]);
  addHiddenClass([bookNowPage]);
})

profileButton.addEventListener('click', function () {
  let userBookings = findCustomerBookings(bookings, currentUser);
  displayPastReservations(userBookings);
  let totalCost = calculateBookingsCost(rooms, userBookings);
  displayTotalSpent(totalCost);
});

dateSearchButton.addEventListener('click', function (event) {
  event.preventDefault()
  let availableRooms = checkAvailability(rooms, bookings, dateInput.value);
  displayAvailableRooms(availableRooms);
});

roomFilterButton.addEventListener('click', function(event) {
  event.preventDefault()
  let filteredRooms = filterRoomType(rooms, roomSelectInput.value);
  console.log('filteredRooms', filteredRooms)
  displayFilteredRooms(filteredRooms);
})

// Event Handlers/Functions
function removeHiddenClass(elements) {
  return elements.forEach(element => element.classList.remove('hidden'));
};

function addHiddenClass(elements) {
  return elements.forEach(element => element.classList.add('hidden'));
};

const displayPastReservations = (array) => {
  pastReservations.innerHTML = ''
  return array.forEach(elem => {
    pastReservations.innerHTML += `
        <div class="booking-info">
          <p>room #${elem.roomNumber}</p>
          <p>date booked: ${elem.date}</p>
        <div>
        `
  });
};

const displayTotalSpent = (total) => {
  totalSpentLabel.innerHTML = '';
  totalSpentLabel.innerHTML = `
    <p>You have spent a total of:</p>
    <p>$ ${Math.round(total).toFixed(2)}</p>`
};

const displayAvailableRooms = (array) => {
  roomsAvailable.innerHTML = '';
  return array.forEach(room => {
    roomsAvailable.innerHTML += `
    <div class="booking-info">
      <p>room #${room.number}</p>
      <p>type: ${room.roomType}</p>
      <p>$${room.costPerNight.toFixed(2)}/per night</p>
    <div>`
  });
};

const displayFilteredRooms = (array) => {
  roomsAvailable.innerHTML = '';
  return array.forEach(room => {
    roomsAvailable.innerHTML += `
    <div class="booking-info">
      <p>room #${room.number}</p>
      <p>type: ${room.roomType}</p>
      <p>$${room.costPerNight.toFixed(2)}/per night</p>
    <div>`
  })
}