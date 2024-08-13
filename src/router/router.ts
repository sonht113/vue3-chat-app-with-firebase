import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";
import sessionStorageUtils from "../utils/storage";

const isServer = typeof window === "undefined";
const history = isServer ? createMemoryHistory() : createWebHistory();

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/pages/home/index.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/login/index.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () => import("@/pages/sign-up/index.vue"),
  },
  {
    path: "/:path(.*)",
    name: "notFound",
    component: () => import("@/pages/not-found.vue"),
  },
];

const router = createRouter({
  history,
  routes,
});

router.beforeEach((to, _from, next) => {
  const token = sessionStorageUtils.get("token");
  // const id = sessionStorageUtils.get("id");
  // if(id) {

  // }
  if (token || to.name === "Login" || to.name === "SignUp") {
    next();
  } else {
    next({ name: "Login" });
  }
});

export default router;
