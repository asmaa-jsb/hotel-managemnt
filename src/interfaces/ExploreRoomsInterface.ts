
// src / ExploreRoomsInterface.ts

export interface Facility {
  _id: string;
  name: string;
}

export interface CreatedBy {
  _id: string;
  userName: string;
}

export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: Facility[];
  createdBy: CreatedBy;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RoomExploreList {
  rooms: Room[];
  totalCount: number;
}
