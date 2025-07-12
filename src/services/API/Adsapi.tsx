import type { CreateAdsInput, IAdsList } from "@/interfaces/AdsInterface";
import { ADS_URLS, axiosInstance } from "../EndPoints/EndPoints";

export const fetchAds = async (page = 1, size = 10): Promise<IAdsList> => {
  const response = await axiosInstance.get(ADS_URLS.ADS_LIST, {
    params: { page, size },
  });

  return response.data;
};

export const createADS = async (payload: CreateAdsInput) => {
  const response = await axiosInstance.post(ADS_URLS.ADS_LIST, payload);
  return response.data;
};
