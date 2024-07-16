import { GlobalState } from "@/redux/interface";
import * as types from "@/redux/mutation-type";
import { Draft, produce } from "immer";
import { Action } from "redux";

const globalState: GlobalState = {
    token: ""
}

interface SetTokenAction extends Action {
    type: typeof types.SET_TOKEN,
    token: string
}

type ActionType = SetTokenAction;

const global = (state = globalState, action: ActionType) => {
    return produce(state, (draftState: Draft<GlobalState>) => {
        switch (action.type) {
            case types.SET_TOKEN:
                draftState.token = action.token
                break;
            default:
                break;
        }
    })
}

export default global;