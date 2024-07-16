import { store } from "@/redux";
import { Navigate, useLocation } from "react-router-dom";

// 路由守卫组件
const AuthRouter = (props: {children: JSX.Element}) => {
    // 获取路由信息
    const { pathname } = useLocation();

    // 判断是否有token
    const token = store.getState().global.token;
    // 如果没有token，则跳转到登录页
    if(!token) {
        if(pathname !== '/login') {
            return <Navigate to="/login" replace />
        } else {
            return props.children
        }
    }

    if(pathname === 'login'){
        // 跳转到系统中
        return <Navigate to="/loading" replace />
    }
    
    // 获取权限路由
    const dynamicRouter = store.getState().auth.authRouter
    ;
}

export default AuthRouter;