import { Navigate, useRoutes } from "react-router-dom";
// import Login from "@/pages/Login";
import lazyLoad from "./utils/lazyLoad";
import React from "react";
import { RouteItem } from "./types/routes";
import { store } from "@/redux";

// 导入modules文件夹下的路由文件
export const modules = import.meta.glob("./modules/*.tsx", { eager: true });

// 获取路由
export const routes: RouteItem[] = [];
Object.keys(modules).forEach((item) => {
  // @ts-ignore
  Object.keys(modules[item]).forEach((key) => {
    // @ts-ignore
    routes.push(...modules[item][key]);
  });
});
// 写一个高阶组件来做路由守卫
function AuthWrapper () {
  function handleAuthCheck() {
    // 从store里面拿到token
    const userToken = store.getState().global.token;

    if (userToken) {
      return <Navigate to="/sys/home" />
    } else {
      return <Navigate to="/login" />
    }
  }
  return handleAuthCheck();
}

const rootRouter = [
  {
    path: "/",
    // element: <Navigate to="/login" />,
    element: <AuthWrapper />
  },
  {
    path: "/login",
    element: lazyLoad(React.lazy(() => import("@/pages/Login"))),
    meta: {
      title: "登录",
      requiresAuth: false,
    },
  },
  ...routes,
];

const Router = () => {
  return useRoutes(rootRouter);
};

export default Router;
