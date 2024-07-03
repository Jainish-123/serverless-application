import axios from "axios";
import { EventListResponse } from "../interfaces/EventListResponse";

const API_URL = "https://us-east1-regal-habitat-428115-b8.cloudfunctions.net";

export const createEvent = async (
  title: string,
  description: string,
  date: string,
  time: string,
  image?: File | null
) => {
  let file = null;
  if (image) {
    file = await convertBase64(image);
  }

  return await axios.post(`${API_URL}/CreateEvent`, {
    title,
    description,
    date,
    time,
    file,
  });
};

export const fetchEvents = async (): Promise<any> => {
  const response = await axios.get<EventListResponse>(`${API_URL}/GetEvents`);
  return response;
};

export const registerForEvent = async (
  eventId: string,
  name: string,
  email: string,
  phone: string
) => {
  const response = await axios.post(`${API_URL}/RegisterEvent `, {
    eventId,
    name,
    email,
    phone,
  });
  return response.data;
};

const convertBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
