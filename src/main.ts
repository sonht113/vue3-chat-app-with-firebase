import { createApp } from "vue";
import { Quasar } from "quasar";
import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";

import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import 'vue3-toastify/dist/index.css';
import "virtual:uno.css";

const app = createApp(App);

app.use(router);

app.use(Quasar, {
  plugins: {},
});

app.use(Vue3Toasity, { autoClose: 2000 } as ToastContainerOptions);

app.mount("#app");
