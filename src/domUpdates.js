import { getAllBookings, getAllCustomers, getAllRooms, getSingleCustomer } from "./apiCalls";

// Query Selectors
const newBookingButton = document.querySelector('.book-now-button');
const profileButton = document.querySelector('.profile-button');
const bookNowPage = document.querySelector('.book-now-page');
const profilePage = document.querySelector('.profile-page');
// Event Listeners
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

const startFetch = () => {
  Promise.all([getAllBookings(), getAllCustomers(), getSingleCustomer(), getAllRooms()]).then((data) => {
    console.log(data)
  })
}

startFetch();