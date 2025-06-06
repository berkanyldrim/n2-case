import { createApp } from "vue";
import "./index.css";

import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import router from "./router";
import App from "./App.vue";

const app = createApp(App);

const pinia = createPinia();

app.use(router);
app.use(VueQueryPlugin);
app.use(pinia);
app.mount("#app");
