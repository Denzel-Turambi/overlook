import { getAllBookings, getAllCustomers, getAllRooms, getSingleCustomer } from "./apiCalls";

// Query Selectors

// Event Listeners

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