import type { CreateAdsInput, IAdsList } from "@/interfaces/AdsInterface";

import {
  ADS_URLS,
  axiosInstance,
  USER_ADS_URLS,
} from "../EndPoints/EndPoints";
import type { AdsLanding, IAdsListLanding } from "@/interfaces/AdsLandingInterface";

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

export const updateAds = async ({
  id,
  payload,
}: {
  id: string;
  payload: CreateAdsInput;
}) => {
  const response = await axiosInstance.put(ADS_URLS.ADS_Edit(id), payload);
  return response.data;
};

export const FetchAdsLanding = async (): Promise<IAdsListLanding> => {
  const response = await axiosInstance.get(
    USER_ADS_URLS.GET_ALL_USERS_ADS
  );
  return response.data;
};
