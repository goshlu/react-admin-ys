import { BreadcrumbState } from "@/redux/interface";
import * as types from "@/redux/mutation-type"
import { Draft, produce } from "immer";


const breadcrumbState: BreadcrumbState = {
    breadcrumbList: {}
}

export type ActionType = {
    type: typeof types.SET_BREADCRUMB_LIST,
    breadcrumbList: BreadcrumbState
}

const breadcrumb = (state = breadcrumbState, action: ActionType) => {
    return produce(state, (draftState: Draft<BreadcrumbState>) => {
        switch(action.type) {
            case types.SET_BREADCRUMB_LIST:
                draftState.breadcrumbList = action.breadcrumbList
                break;
            default:
                break;
        }
    })
}

export default breadcrumb;