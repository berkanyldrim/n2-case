export const API_ENDPOINTS = {
  USER: {
    GET_USERS: "/users",
  },
  TODO: {
    GET_TODOS: "/todos",
    GET_USER_TODOS: (userId: number) => `/users/${userId}/todos`,
  },
  POST: {
    GET_POSTS: "/posts",
    GET_USER_POSTS: (userId: number) => `/users/${userId}/posts`,
    GET_POST_COMMENTS: (postId: number) => `/posts/${postId}/comments`,
  },
  ALBUM: {
    GET_ALBUMS: "/albums",
    GET_USER_ALBUMS: (userId: number) => `/users/${userId}/albums`,
    GET_ALBUM_PHOTOS: (albumId: number) => `/albums/${albumId}/photos`,
  },
};
