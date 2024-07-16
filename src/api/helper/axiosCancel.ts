import axios, { AxiosRequestConfig, Cancel } from "axios";
import qs from "qs";

// 声明一个Map用于存储每个请求的标识和取消函数
const pendingMap = new Map<string, Cancel>();
export const getPendingUrl = (config: AxiosRequestConfig) => [
    config.method,
    config.url,
    qs.stringify(config.data),
    qs.stringify(config.params),   
].join("&");

export class AxiosCanceler {
    // 添加请求
    addPending(config: AxiosRequestConfig) {
        // 在请求开始前添加请求到 pending 中
        this.removePending(config);
        const url = getPendingUrl(config);

        config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
            if (!pendingMap.has(url)) {
                // 如果 pending 中不存在当前请求,则添加进去
                pendingMap.set(url, cancel);
            }
        })
    }

    // 取消请求
    removeAllPending(config: any) {
        pendingMap.forEach((cancel, url) => {
            cancel && typeof cancel === "function" && cancel(url);
        })
        pendingMap.clear();
    }

    // 移除请求
    removePending(config: AxiosRequestConfig) {
        const url = getPendingUrl(config);
        if(pendingMap.has(url)) {
            // 如果在 pending 中存在当前请求标识，需要取消当前请求并且移除
            const cancel = pendingMap.get(url);
            cancel && typeof cancel === "function" && cancel(url);
            pendingMap.delete(url);
        }
    }

    // 重置
    reset() {
        pendingMap.clear();
    }
} 