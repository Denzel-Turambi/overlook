import chai from 'chai';
import { customerData } from '../src/data/customers-sample-data';
import { roomsData } from '../src/data/rooms-sample-data';
import { bookingsData } from '../src/data/bookings-sample-data';
import { findCustomerBookings } from '../src/customerUtils';
const expect = chai.expect;

describe('findCustomerBookings', function() {
  it('should be a function', function() {
    expect(findCustomerBookings).to.be.a('function');
  });

  it('should find users bookings with a matching userID', function() {
    let customer1 = {
      "id": 1,
      "name": "Leatha Ullrich"
    };
    let bookedRooms = findCustomerBookings(bookingsData, customer1);
    let output = [
      {
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 1,
        "date": "2022/02/05",
        "roomNumber": 12
      },
      {
        "id": "5fwrgu4i7k55hl6tb",
        "userID": 1,
        "date": "2022/02/06",
        "roomNumber": 5
      }
    ];

    expect(bookedRooms.length).to.equal(2);
    expect(bookedRooms).to.deep.equal(output);
  })
});