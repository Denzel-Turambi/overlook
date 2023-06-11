import chai from 'chai';
import { bookingsData } from '../src/data/bookings-sample-data';
import { roomsData } from '../src/data/rooms-sample-data';
import { checkAvailability } from '../src/bookingsUtils';
const expect = chai.expect;

describe('checkAvailability', function() {
  it('should be a function', function() {
    expect(checkAvailability).to.be.a('function');
  });

  it('should find rooms that are available on a date', function() {
    // Note: Do this for iteration 2
  })
});