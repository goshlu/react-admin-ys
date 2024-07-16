//操作的动作
import * as types from "../../mutation-type";

export const setToken = (token: string) => ({
    type: types.SET_TOKEN,
    token
})