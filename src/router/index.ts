import { createWebHistory, createRouter } from "vue-router";
import Home from "@/Home.vue";
import TodoView from "@/views/TodoView.vue";
import PostView from "@/views/PostView.vue";
import AlbumView from "@/views/AlbumView.vue";
import AlbumDetailView from "@/views/AlbumDetailView.vue";

const routes = [
  {
    path: "/",
    component: Home,
    name: "home",
  },
  {
    path: "/user/:userId/todos",
    component: TodoView,
    name: "todos",
  },
  {
    path: "/user/:userId/posts",
    component: PostView,
    name: "posts",
  },
  {
    path: "/user/:userId/albums",
    component: AlbumView,
    name: "albums",
  },
  {
    path: "/user/:userId/albums/:albumId",
    component: AlbumDetailView,
    name: "album-detail",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
