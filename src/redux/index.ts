import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import global from "./modules/global/reducer";
import auth from "./modules/auth/reducer";
import breadcrumb from "./modules/breadcrumb/reducer";

// redux持久化配置
const persistConfig = {
    key: "redux-state",
    storage: storage
}

// 创建reducer
const reducer = combineReducers({
    global,
    auth,
    breadcrumb
})

// 创建一个新的redux状态的reducer
const persistReducerConfig = persistReducer(persistConfig, reducer);

// 开启redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// 使用redux 中间件
const middleware = applyMiddleware(thunk);

// 创建store
const  store = createStore(persistReducerConfig, composeEnhancers(middleware));

// 创建一个持久化store
const persistor = persistStore(store);

export {
    store,
    persistor
}