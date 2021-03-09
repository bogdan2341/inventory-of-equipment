import axios from "../../utils/axios";

export interface TrainsData {
  _id?: string;
  number: string;
  manufactureYear: number;
  dateOfLastKR: Date;
}

export const getAllTrains = async () => {
  try {
    const response = await axios.get<TrainsData[]>("trains");
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getTrainNumberById = async (
  trainId: string,
  cb: (number: string) => void
) => {
  try {
    const response = await axios.get<TrainsData>("trains/" + trainId);
    cb(response.data.number);
  } catch (error) {
    console.log(error);
  }
};

export const createNewTrain = async (
  number: string,
  manufactureYear: number,
  dateOfLastKR: Date
) => {
  try {
    await axios.post<TrainsData>("trains/", {
      number,
      manufactureYear,
      dateOfLastKR,
    });
  } catch (error) {
    console.log(error);
  }
};
