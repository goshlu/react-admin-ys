import { message } from "antd";

export function checkStatus(status:number) {
    switch(status) {
        case 403:
            break;
        case 404:
            message.error("请求的资源不存在");
            break
        default:
            message.error("请求失败");
    }
}