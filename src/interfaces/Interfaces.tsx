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
  images: string[];
}

export interface IRoomList {
  success: boolean;
  message: string;
  data: {
    rooms: Room[];
  };
}
/***********Booking**********/
export interface Booking {
  _id: string;
  roomNum: string;
  startDate: string;
  endDate: string;
  status: string;
  totalPrice: number;
  user?: {
    userName: string;
  };
}

export interface BookingDetails {
  _id: string;
  roomNum: string;
  startDate: string;
  endDate: string;
  status: string;
  totalPrice: number;
  userName: string;
}

export interface CreateBooking {
  startDate: string;
  endDate: string;
  room: string;
  totalPrice: number;
}
/*************user profile************ */
export type UserProfile = {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  country: string;
  role: string;
  profileImage: string;
};
/**************reviews************* */
export interface Review {
  roomId:string;
  rating: number | null;
  review: string;
}
/***************comments */
export interface Comment {
    roomId:string;
    comment:string;
}