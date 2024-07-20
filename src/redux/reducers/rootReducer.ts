import { combineReducers } from "@reduxjs/toolkit";
import siderReducer from "./siderReducer";
import serviceReducer from "./serviceReducer";
import customerReducer from "./customerReducer";
import userReducer from "./userReducer";
import appointmentReducer from "./appointmentReducer";
import historyReducer from "./historyReducer";
import invoiceReducer from "./invoiceReducer";
import scheduleReducer from "./scheduleReducer";
import dashboardReducer from "./dashboardReducer";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
    sider: siderReducer,
    category: categoryReducer,
    service: serviceReducer,
    customer: customerReducer,
    user: userReducer,
    appointment: appointmentReducer,
    history: historyReducer,
    invoice: invoiceReducer,
    schedule: scheduleReducer,
    dashboard: dashboardReducer,
    auth: authReducer
});

export default rootReducer;