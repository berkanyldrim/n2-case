import api from "../axios";
import { API_ENDPOINTS } from "../endpoints";

export const albumService = {
  getAlbums: async () => {
    const response = await api.get(API_ENDPOINTS.ALBUM.GET_ALBUMS);
    return response.data;
  },
  getUserAlbums: async (userId: number) => {
    const response = await api.get(API_ENDPOINTS.ALBUM.GET_USER_ALBUMS(userId));
    return response.data;
  },
  getAlbumPhotos: async (albumId: number) => {
    const response = await api.get(
      API_ENDPOINTS.ALBUM.GET_ALBUM_PHOTOS(albumId)
    );
    return response.data;
  },
};
