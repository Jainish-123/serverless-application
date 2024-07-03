import axios from "axios";

const API_URL =
  "https://4d463hsd93.execute-api.us-east-1.amazonaws.com/dev/api/users";

export const imageupload = async (imageFile: File) => {
  const file = await convertBase64(imageFile);

  console.log("data: ", convertBase64(imageFile));
  return await axios.post(`${API_URL}/imageupload`, {
    file: file,
  });
};

const convertBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
