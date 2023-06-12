import { getAllBookings, getAllCustomers, getAllRooms, getSingleCustomer } from "./apiCalls";
import { calculateBookingsCost, findCustomerBookings, findUserID } from "./customerUtils";
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

// profile page/reservations dashboard
const profilePage = document.querySelector('.profile-page');
const pastReservations = document.querySelector('.past-reservations');

// login page
const loginPage = document.querySelector('.login-page');
const loginForm = document.querySelector('.login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const loginButton = document.querySelector('.login-button');

// Event Listeners
window.addEventListener('load', () => {
  Promise.all([getAllBookings(), getAllCustomers(), getSingleCustomer(), getAllRooms()]).then((data) => {
    console.log(data)
    bookings = data[0].bookings;
    currentUser = data[2];
    customers = data[1].customers;
    rooms = data[3].rooms;
  });
})

newBookingButton.addEventListener('click', function () {
    removeHiddenClass([bookNowPage]);
    addHiddenClass([profilePage]);
});

profileButton.addEventListener('click', function () {
  removeHiddenClass([profilePage]);
  addHiddenClass([bookNowPage]);
})

// Event Handlers/Functions
function removeHiddenClass(elements) {
  return elements.forEach(element => element.classList.remove('hidden'));
};

function addHiddenClass(elements) {
  return elements.forEach(element => element.classList.add('hidden'));
};

// const startFetch = () => {
//   Promise.all([getAllBookings(), getAllCustomers(), getSingleCustomer(), getAllRooms()]).then((data) => {
//     console.log(data)
//     let bookings = data[0].bookings;
//     let singleCustomer = data[2];
//     let customers = data[1].customers;
//     let rooms = data[3].rooms;
//     window.addEventListener('load', function() {
//       let userBookings = findCustomerBookings(bookings, singleCustomer)
//       displayPastReservations(userBookings);
//       console.log(userBookings)
//     })
//   })
  

//   const displayPastReservations = (array) => {
//     pastReservations.innerHTML = ''
//     return array.forEach(elem => {
//       pastReservations.innerHTML += `
//       <p>${elem.roomNumber}</p>
//       `
//     })
//   }
// }

// startFetch();
