import { combineReducers } from "@reduxjs/toolkit";
import siderReducer from "./siderReducer";
import categoryReducer from "./categoryReducer";
import serviceReducer from "./serviceReducer";
import customerReducer from "./customerReducer";
import userReducer from "./userReducer";
import appointmentReducer from "./appointmentReducer";
import historyReducer from "./historyReducer";
import invoiceReducer from "./invoiceReducer";

const rootReducer = combineReducers({
    sider: siderReducer,
    category: categoryReducer,
    service: serviceReducer,
    customer: customerReducer,
    user: userReducer,
    appointment: appointmentReducer,
    history: historyReducer,
    invoice: invoiceReducer
});

export default rootReducer;