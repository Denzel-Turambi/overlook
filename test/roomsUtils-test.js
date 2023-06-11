import chai from 'chai';
import { roomsData } from '../src/data/rooms-sample-data';
import { filterRoomType } from '../src/roomsUtils';
const expect = chai.expect;

describe('filterRoomType', function() {
  it('should be a function', function() {
    expect(filterRoomType).to.be.a('function')
  });

  it('should filter rooms by type', function() {
    let filteredRooms = filterRoomType(roomsData, 'junior suite');
    let output = [
      {
      "number": 6,
      "roomType": "junior suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 397.02
      },
      {
      "number": 8,
      "roomType": "junior suite",
      "bidet": false,
      "bedSize": "king",
      "numBeds": 1,
      "costPerNight": 261.26
      }
    ];


    expect(filteredRooms.length).to.equal(2);
    expect(filteredRooms).to.deep.equal(output);
  })

  it('should filter rooms by a different type', function() {
    let filteredRooms = filterRoomType(roomsData, 'residential suite');
    let output = [
      {
      "number": 1,
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 358.4
      }
    ];

    expect(filteredRooms.length).to.equal(1);
    expect(filteredRooms).to.deep.equal(output);
  })
});

