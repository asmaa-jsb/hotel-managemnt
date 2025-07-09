export interface IRoomFacilities {
  success: boolean;
  message: string;
  data: {
    facilities: Facility[];
    totalCount: number;
  };
}

export interface Facility {
  _id: string;
  name: string;
  createdBy: {
    _id: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
}
