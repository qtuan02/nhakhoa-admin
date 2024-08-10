import { combineReducers } from "@reduxjs/toolkit";
import appointmentReducer from "./appointmentReducer";
import categoryReducer from "./categoryReducer";
import customerReducer from "./customerReducer";
import historyReducer from "./historyReducer";
import invoiceReducer from "./invoiceReducer";
import overviewReducer from "./overviewReducer";
import scheduleReducer from "./scheduleReducer";
import serviceReducer from "./serviceReducer";
import userReducer from "./userReducer";
import timeReducer from "./timeReducer";
import doctorReducer from "./doctorReducer";
import statisticReducer from "./statisticReducer";
import authReducer from "./authReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
    appointment: appointmentReducer,
    auth: authReducer,
    category: categoryReducer,
    customer: customerReducer,
    history: historyReducer,
    invoice: invoiceReducer,
    overview: overviewReducer,
    schedule: scheduleReducer,
    service: serviceReducer,
    user: userReducer,
    time: timeReducer,
    doctor: doctorReducer,
    statistic: statisticReducer,
    notification: notificationReducer,
});

export default rootReducer;