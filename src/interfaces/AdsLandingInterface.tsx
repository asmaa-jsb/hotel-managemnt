import type { CreatedBy} from "./RoomInterface";

export interface AdsLanding {
  _id: string;
  isActive: boolean;
  room: Room;
  createdBy: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IAdsListLanding {
  success: boolean;
  message: string;
  data: {
    ads: AdsLanding[];
  };
}

export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: string[];
  createdBy: CreatedBy;
  images: string[];
}
