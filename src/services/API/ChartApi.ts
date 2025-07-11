import { axiosInstance, CHART } from "../EndPoints/EndPoints";

export const fetchChart = async () => {
  const response = await axiosInstance.get(CHART.GET_CHART);
  return response.data;
}