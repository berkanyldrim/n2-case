import { createWebHistory, createRouter } from "vue-router";
import Home from "../Home.vue";
import TodoView from "../views/TodoView.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
