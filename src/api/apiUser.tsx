import axiosInstance from "./axios";
import { AxiosResponse } from 'axios';

interface UserData {
  // Define the structure of user data here
  // For example:
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  // Define the structure of login data here
  // For example:
  email: string;
  password: string;
}

interface AuthHeader {
  // Define the structure of auth header here
  // For example:
  Authorization: string;
}

const apiUser = {
  // create user
  // createUser: (data: UserData): Promise<AxiosResponse> => {
  //   return axiosInstance.post("/register", data);
  // },

  loginUser: (data: LoginData): Promise<AxiosResponse> => {
    return axiosInstance.post("/admin/login", data);
  },

  getOne: (id: string): Promise<AxiosResponse> => {
    return axiosInstance.get(`/users/${id}?populate=*`);
  },

  getAll: (): Promise<AxiosResponse> => {
    return axiosInstance.get("/users?populate=*");
  },
  updateUserImage: (imageData: FormData): Promise<AxiosResponse> => {
    return axiosInstance.post(`/users/photo`, imageData);
  },
  updateUserBackground: (backgroundData: FormData): Promise<AxiosResponse> => {
    return axiosInstance.post(`/users/background`, backgroundData);
  },

  // getAuth: (header: AuthHeader): Promise<AxiosResponse> => {
  //   return axiosInstance.get("/auth", { headers: header });
  // },
  getCurrentUser: (): Promise<AxiosResponse> => {
    return axiosInstance.get("/adminuser");
  },
};

export default apiUser;