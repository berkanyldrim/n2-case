import api from "../axios";
import { API_ENDPOINTS } from "../endpoints";

export const todoService = {
  getTodos: async () => {
    const response = await api.get(API_ENDPOINTS.TODO.GET_TODOS);
    return response.data;
  },
  getUserTodos: async (userId: number) => {
    const response = await api.get(API_ENDPOINTS.TODO.GET_USER_TODOS(userId));
    return response.data;
  },
};
