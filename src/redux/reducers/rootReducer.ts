import { combineReducers } from "@reduxjs/toolkit";
import siderReducer from "./siderReducer";
import categoryReducer from "./categoryReducer";
import serviceReducer from "./serviceReducer";
import customerReducer from "./customerReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    sider: siderReducer,
    category: categoryReducer,
    service: serviceReducer,
    customer: customerReducer,
    user: userReducer
});

export default rootReducer;