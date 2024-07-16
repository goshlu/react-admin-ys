import { useLocation } from "react-router-dom";
import { routerArray } from "@/routes";
import { searchRoute } from "@/utils";
import { store } from "@/redux";

const useAuthButton = () => {
    const {pathname} = useLocation();
    const route = searchRoute(pathname, routerArray)

    return {
        Buttons: store.getState().auth.authButtons[route?.meta?.key || ''] || {}
    }
}

export default useAuthButton;