export interface Ads {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  rooms: [];
}

export interface IAdsList {
  success: boolean;
  message: string;
  data: {
    ads: Ads[];
    totalPages: number;
    totalItems: number;
  };
}

export interface CreateAdsInput {
  room?: string;

  discount: number;
  isActive: boolean;
}
