import { store } from "@/redux";
import { setToken } from "@/redux/modules/global/action";
import { message } from "antd";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Nprogress from "nprogress"
import { checkStatus } from "./helper/check";
import { AxiosCanceler } from "./helper/axiosCancel";

const axiosCanceler = new AxiosCanceler();

const config = {
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    },
    withCreadentials: true, // 跨域时是否允许携带凭证
}

class RequestHttp {
    service: AxiosInstance;
    public constructor(config: AxiosRequestConfig) {
        this.service = axios.create(config);
        // 请求拦截
        this.service.interceptors.request.use((config) => {
            Nprogress.start();
            const token = store.getState().user.token;
            if(token) {
                config.headers!.Authorization = `Bearer ${token}`;
            }
            // 将当前请求添加到pending中
            axiosCanceler.addPending(config);
            return config;
        }, (error) => {
            return Promise.reject(error);
        })

        // 响应拦截
        this.service.interceptors.response.use((res: AxiosResponse) => {
           const {config,data} = res;
           Nprogress.done();
           if(data.code && data.code !==200) {
               message.error(data.msg);
               return Promise.reject(data)
           }
           return data
        }, (error) => {
            Nprogress.done();
            // 移除当前请求。
            axiosCanceler.removeAllPending(config);
           const {response} = error;
           if(response) {
            // 请求已经发出，但是不在2xx范围内
            // 比如token 失效
            if(response.status === 401) {
                store.dispatch(setToken('')) // 把token设置为空
                // 
                message.error("登录已过期, 请重新登录")
                window.location.href = '/login';
                return Promise.reject(error)
            }
            // 请求超时
            if(error.message.includes('timeout')) {
                message.error("请求超时")
                return Promise.reject(error)
            }

            // 根据不同的http status返回不同的信息展示
            if(response) {
                checkStatus(response.status)
            }

            return Promise.reject(error)
           }
        })
    }

}

export default new RequestHttp(config)