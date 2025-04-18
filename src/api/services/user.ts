import api from "../axios";
import { API_ENDPOINTS } from "../endpoints";

export const userService = {
  getUsers: async () => {
    const response = await api.get(API_ENDPOINTS.USER.GET_USERS);
    return response.data;
  },
};
