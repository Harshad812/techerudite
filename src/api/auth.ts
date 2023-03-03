import axios from "axios";

const baseURL = "http://localhost:5000";

export const singup = async (payload: any) => {
  const response = await axios({
    method: "post",
    url: `${baseURL}/users/`,
    data: payload,
  });

  return response.data;
};

export const signin = async (payload: any) => {
  const response = await axios({
    method: "post",
    url: `${baseURL}/users/signin`,
    data: payload,
  });
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios({
    method: "get",
    url: `${baseURL}/users/`,
  });
  return response.data;
};
