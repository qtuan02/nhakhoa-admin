import { combineReducers } from "@reduxjs/toolkit";
import appointmentReducer from "./appointmentReducer";
import authenticateReducer from "./authenticateReducer";
import categoryReducer from "./categoryReducer";
import customerReducer from "./customerReducer";
import historyReducer from "./historyReducer";
import invoiceReducer from "./invoiceReducer";
import overviewReducer from "./overviewReducer";
import scheduleReducer from "./scheduleReducer";
import serviceReducer from "./serviceReducer";
import siderReducer from "./siderReducer";
import userReducer from "./userReducer";


const rootReducer = combineReducers({
    appointment: appointmentReducer,
    authenticate: authenticateReducer,
    category: categoryReducer,
    customer: customerReducer,
    history: historyReducer,
    invoice: invoiceReducer,
    overview: overviewReducer,
    schedule: scheduleReducer,
    service: serviceReducer,
    sider: siderReducer,
    user: userReducer,
});

export default rootReducer;