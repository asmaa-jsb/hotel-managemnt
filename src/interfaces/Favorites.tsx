
export interface FavoriteRoomRaw {
  _id: string;
  rooms: string[]; 
  user: string;    
  createdAt: string;
  updatedAt: string;
}

export interface FavoriteRoom {
  _id: string;
  rooms: Room[];
  user: {
    _id: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AddToFavoritesResponse {
  success: boolean;
  message: string;
  data: {
    favoriteRoom: FavoriteRoomRaw;
  };
}


export interface FavoriteRoomsResponse {
  success: boolean;
  message: string;
  data: {
    favoriteRooms: FavoriteRoom[];
    totalCount: number;
  };
}


export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: string[];
  createdBy: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
