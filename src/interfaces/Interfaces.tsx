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
export interface ReviewsApiResponse {
  data: {
   data:{ roomReviews : Reviews[]};
  };
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
interface User {
  _id: string;
  userName: string;
  profileImage: string;
}

interface RoomReview {
  _id: string;
  roomNumber: string;
}

export interface Reviews {
  _id: string;
  createdAt: string; 
  updatedAt: string; 
  rating: number;
  review: string;
  room: RoomReview;
  user: User;
}
export interface MyBookingApiResponse {
  data: {
   data:{ myBooking: MyBooking[]};
  };
}

/***************comments */
export interface Comment {
    roomId?:string ;
    comment:string;
}


export interface Comments {
  _id: string;
  createdAt: string; 
  updatedAt: string; 
 comment: string;
  room: RoomReview;
  user: User;
}
export interface CommentsApiResponse {
  data: {
   data:{ roomComments: Comments[]};
  };
}
// Interface for the "ad" object received from the API.
export interface AdData {
    _id?: string;
  isActive?: boolean;
  room?: {
    _id?: string;
    roomNumber?: string;
    price?: number;
    discount?: number;
    capacity?: number;
  };
}

// Interface for data used to render table rows
export interface TableRowData {
  id: string;
  roomNumber: string;
  price: string;
  discount: string;
  capacity: string;
}
interface User {
  _id: string;
}

export interface MyBooking {
  _id: string;
  createdAt: string;       
  endDate: string;         
  room: string;
  startDate: string;       
  status: string;
  stripeChargeId: string;
  totalPrice: number;
  updatedAt: string;       
  user: User;
}



export interface AdDetails {
   _id: string;
  createdAt: string; 
  createdBy: User;
  isActive: boolean;
  room: Room;
  updatedAt: string; 
};


export interface DetailsApiResponse {
 
   data: {
    ads: AdDetails;
  };
  
}