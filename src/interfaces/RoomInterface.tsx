export interface Facility {
  _id: string;
  name: string;
}

export interface CreatedBy {
  _id: string;
  name: string;
}

export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: Facility[]; 
  createdBy: CreatedBy;
  images: File[];
}

export interface IRoomList {
  success: boolean;
  message: string;
  data: {
    rooms: Room[];
    totalPages: number;
    totalItems: number;
  };
}

export interface CreateRoomInput {
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: Facility[];
  images: File[];
}
