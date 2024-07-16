import { RouteItem } from "@/routes/types/routes";

export const searchRoute = (key:string, routes: RouteItem[]) => {
    let result: RouteItem | undefined;

    for(let i = 0; i < routes.length; i++) {
        const item = routes[i];
        if(item.path === key) {
            return item;
        } else if(item.children) {
            result = searchRoute(key, item.children);
            if(result) {
                return result;
            }
        }
    }
}

// 我们需要双重递归，找出所有面包屑生成对象存储到redux中
export function findAllBreadcrumb(menuList:Menu.MenuOptions[]): {
    [key:string]:any
} {
    let handleBreadcrumbList:any = {};
    let loop = (menuItem: Menu.MenuOptions) => {
        if(menuItem.children && menuItem.children.length) {
            menuItem.children.forEach(item => {
                loop(item);
            })
        } else {
            handleBreadcrumbList[menuItem.path] = getBreadcrumbList(menuItem.path, menuList);
        }
    }

    menuList.forEach(item => {
        loop(item);
    })
    return handleBreadcrumbList;
}

function getBreadcrumbList(path: string | undefined, menuList: Menu.MenuOptions[]) {
    let breadcrumbList: any[] = [];
    try {
        const loop = (menuItem: Menu.MenuOptions) => {
            breadcrumbList.push(menuItem);
            if(menuItem.path === path) {
                throw new Error('find breadcrumb');
            }
            if(menuItem.children && menuItem.children.length) {
                for(let i = 0; i < menuItem.children.length; i++) {
                    loop(menuItem.children[i]);
                }
                // 当前节点的子节点遍历完依旧没有找到，则删除路径中的节点
                breadcrumbList.pop();
            } else {
                // 找到叶节点时，删除路径中的该节点的子节点
                breadcrumbList.pop();
             }
        }
        for(let i = 0; i < menuList.length; i++) {
            loop(menuList[i]);
        }
    } catch (error) {
        return breadcrumbList.map(item => item.label)
    }
    return breadcrumbList; 
}