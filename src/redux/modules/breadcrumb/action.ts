import * as types from "@/redux/mutation-type";

export const setBreadcrumbList = (breadcrumbList: {[propName: string]:any}) => {
    return {
        type: types.SET_BREADCRUMB_LIST,
        breadcrumbList
    }
}