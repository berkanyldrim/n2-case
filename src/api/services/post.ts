import api from "../axios";
import { API_ENDPOINTS } from "../endpoints";

export const postService = {
  getPosts: async () => {
    const response = await api.get(API_ENDPOINTS.POST.GET_POSTS);
    return response.data;
  },
  getUserPosts: async (userId: number) => {
    const response = await api.get(API_ENDPOINTS.POST.GET_USER_POSTS(userId));
    return response.data;
  },
  getPostComments: async (postId: number) => {
    const response = await api.get(
      API_ENDPOINTS.POST.GET_POST_COMMENTS(postId)
    );
    return response.data;
  },
};
