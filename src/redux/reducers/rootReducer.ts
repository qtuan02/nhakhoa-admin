import { combineReducers } from "@reduxjs/toolkit";
import siderReducer from "./siderReducer";
import categoryReducer from "./categoryReducer";
import serviceReducer from "./serviceReducer";

const rootReducer = combineReducers({
    sider: siderReducer,
    category: categoryReducer,
    service: serviceReducer
});

export default rootReducer;