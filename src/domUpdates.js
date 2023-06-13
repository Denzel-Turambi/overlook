import { getAllBookings, getAllCustomers, getAllRooms, getSingleCustomer, savePostBooking } from "./apiCalls";
import { checkAvailability } from "./bookingsUtils";
import { calculateBookingsCost, findCustomerBookings, findUserID } from "./customerUtils";
import { filterRoomType } from "./roomsUtils";
// Global Varialbes
var currentUser;
var bookings;
var customers;
var rooms;

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
const roomSelectInput = document.querySelector('.room-select');
const reserveButton = document.querySelector('.reserve-button');


// profile page/reservations dashboard
const profilePage = document.querySelector('.profile-page');
const allReservations = document.querySelector('.all-reservations');
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
  displayAllReservations();
  displayTotalSpent();
});

dateSearchButton.addEventListener('click', function (event) {
  event.preventDefault()
  let availableRooms = checkAvailability(rooms, bookings, dateInput.value);
  displayAvailableRooms(availableRooms);
});

roomFilterButton.addEventListener('click', function (event) {
  event.preventDefault()
  let filteredRooms = filterRoomType(rooms, roomSelectInput.value);
  displayAvailableRooms(filteredRooms);
});

roomsAvailable.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.classList.contains('reserve-button')) {
    let numberOfRoom = parseInt(event.target.parentElement.firstElementChild.id);
    let bookingDate = dateInput.value.split('-').join('/');
    let bookedObj = {
      userID: currentUser.id,
      date: bookingDate,
      roomNumber: numberOfRoom
    };

    savePostBooking(bookedObj).then(() => {
      getAllBookings().then((data) => {
        bookings = data.bookings;
      });
    })
  }
});

// Event Handlers/Functions
function removeHiddenClass(elements) {
  return elements.forEach(element => element.classList.remove('hidden'));
};

function addHiddenClass(elements) {
  return elements.forEach(element => element.classList.add('hidden'));
};

const displayAllReservations = () => {
  let userBookings = findCustomerBookings(bookings, currentUser);
  allReservations.innerHTML = ''
  return userBookings.forEach(elem => {
    allReservations.innerHTML += `
        <div class="booking-info">
          <p>room #${elem.roomNumber}</p>
          <p>date booked: ${elem.date}</p>
        <div>
        `
  });
};

const displayTotalSpent = () => {
  let totalCost = calculateBookingsCost(rooms, bookings);
  totalSpentLabel.innerHTML = '';
  totalSpentLabel.innerHTML = `
    <p>You have spent a total of:</p>
    <p>$ ${totalCost.toFixed(2)}</p>`
};

const displayAvailableRooms = (array) => {
  roomsAvailable.innerHTML = '';
  return array.forEach((room, index) => {
    roomsAvailable.innerHTML += `
    <div class="booking-info">
      <p id="${room.number}">room #${room.number}</p>
      <p>type: ${room.roomType}</p>
      <p>$${room.costPerNight.toFixed(2)}/per night</p>
      <button class="reserve-button" id="${index}">BOOK</button>
    <div>`
  });
};
