// 使用antd Suspense组件
import React, { Suspense } from 'react';
import { Spin } from "antd";

const lazyLoad = (Component: React.LazyExoticComponent<any>): React.ReactNode => {
    return (
        <Suspense fallback={
            <Spin
                size="large"
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                tip="加载中..."
            />
        }>
            <Component />
        </Suspense>
    )
}

export default lazyLoad;
