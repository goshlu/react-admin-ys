import React from "react";
import lazyLoad from "../utils/lazyLoad";
import { LayoutIndex } from "../constant";

const Home = [
    {
        element: <LayoutIndex />,
        children: [
            {
                path: '/home',
                element: lazyLoad(React.lazy(() => import("@/pages/Home"))),
                meta: {
                    title: "首页",
                    requiresAuth: true,
                }
            }
        ]
    }
    
]

export default Home;