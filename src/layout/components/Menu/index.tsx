import { useState } from "react";

const LayoutMenu = (props:any) => {
    const {setAuthRouter, setBreadcrumbList} = props

    // 菜单数据
    const [menuList, setMenuList] = useState<MenuItem[]>([]);
    const [menuData, setMenuData] = useState<Menu.MenuOptions[]>([]);

    // loading
    const [loading, setLoading] = useState<boolean>(false);

    // 获取菜单数据
    const getMenuData = () => {
        setLoading(true);
        try {
            // axios 获取菜单
        }
    }
}