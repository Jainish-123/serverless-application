import axios from "axios";
import ImageListResponse from "../interfaces/ImageListResponse";

const API_URL =
  "https://4d463hsd93.execute-api.us-east-1.amazonaws.com/dev/api/users";

export const imageList = async (): Promise<string[]> => {
  const response = await axios.get<ImageListResponse>(`${API_URL}/image-list`);
  return response.data.s3_urls;
};
