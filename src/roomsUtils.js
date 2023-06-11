const filterRoomType = (roomsData, roomType) => {
  let filtered = roomsData.filter(room => {
    return room.roomType === roomType;
  })
  return filtered;
};

export {
  filterRoomType
}