import { createApp } from "vue";
import { Quasar } from "quasar";
import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";
import { createPinia } from "pinia";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import "vue3-toastify/dist/index.css";
import "virtual:uno.css";
import { libIcon } from "./lib-icon";

/* add icons to the library */
library.add(...libIcon);

const pinia = createPinia();
const app = createApp(App);

app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(pinia);

app.use(Quasar, {
  plugins: {},
});

app.use(Vue3Toasity, {
  autoClose: 300,
  hideProgressBar: true,
} as ToastContainerOptions);

app.mount("#app");
