import axios from "../../utils/axios";

export interface MileagePerDay {
  dayAfterService: number;
  mileageToday: number;
  day: number;
  typeOfService?: "ТО-3" | "ТР-1" | "ТР-3" | "";
}

export interface MileagePerMonth {
  _id: string;
  trainId: string;
  year: number;
  month: number;
  mileagePerMonth: number;
  days: [MileagePerDay];
}

export const getMileagePerMonth = async (
  trainId: string,
  year: string,
  month: string,
  cb: (m: MileagePerMonth) => void
) => {
  try {
    const response = await axios.get<MileagePerMonth>(
      `mileage/${trainId}/${year}/${month}`
    );
    cb(response.data);
  } catch (error) {
    throw error;
  }
};

export const saveMileagePerDay = async (
  trainId: string,
  year: string,
  month: string,
  data: MileagePerDay
) => {
  try {
    const response = await axios.put<MileagePerMonth>(
      `mileage/${trainId}/${year}/${month}`,
      {
        ...data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
