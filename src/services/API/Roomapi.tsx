import { axiosInstance, ROOM_URLS } from "../EndPoints/EndPoints";
import type {
  CreateRoomInput,
  Facility,
  IRoomList,
  Room,
} from "@/interfaces/RoomInterface";

export const fetchRooms = async (page = 1, size = 10): Promise<IRoomList> => {
  const response = await axiosInstance.get(ROOM_URLS.ROOM_LIST, {
    params: { page, size },
  });
  return response.data;
};

export const fetchRoomDetails = async (id: string): Promise<Room> => {
  const response = await axiosInstance.get(ROOM_URLS.GET_ROOM_DETAILS(id));
  return response.data.data.room; // تأكد هيكلية الرد من API
};

export const DeleteRoom = async (id: string): Promise<IRoomList> => {
  const response = await axiosInstance.delete(ROOM_URLS.DELETE_ROOM(id));
  return response.data;
};

export const createRoom = async (data: CreateRoomInput) => {
  const formData = new FormData();

  formData.append("roomNumber", data.roomNumber);
  formData.append("price", data.price.toString());
  formData.append("capacity", data.capacity.toString());
  formData.append("discount", data.discount.toString());

  data.facilities.forEach((facility, index) => {
    formData.append(`facilities[${index}]`, facility._id);
  });

  if (data.images && data.images.length > 0) {
    (data.images as File[]).forEach((img) => {
      formData.append("imgs", img);
    });
  }

  const response = await axiosInstance.post(ROOM_URLS.CREATE_ROOM, formData);
  return response.data;
};

export const fetchFacilities = async (): Promise<Facility[]> => {
  const response = await axiosInstance.get(ROOM_URLS.GET_FACILITIES);
  return response.data.data.facilities;
};

export const updateRoom = async (id: string, data: CreateRoomInput) => {
  const formData = new FormData();

  formData.append("roomNumber", data.roomNumber);
  formData.append("price", data.price.toString());
  formData.append("capacity", data.capacity.toString());
  formData.append("discount", data.discount.toString());

  data.facilities.forEach((facility) => {
    formData.append("facilities[]", facility._id);
  });

  if (data.images && data.images.length > 0) {
    (data.images as File[]).forEach((img) => {
      formData.append("imgs", img);
    });
  }

  const response = await axiosInstance.put(ROOM_URLS.UPDATE_ROOM(id), formData);
  return response.data;
};
