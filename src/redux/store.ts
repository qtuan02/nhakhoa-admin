import { combineReducers, configureStore } from "@reduxjs/toolkit";
import siderReducer from "./reducers/siderReducer";
import categoryReducer from "./reducers/categoryReducer";
import serviceReducer from "./reducers/serviceReducer";
import customerReducer from "./reducers/customerReducer";
import userReducer from "./reducers/userReducer";
import appointmentReducer from "./reducers/appointmentReducer";
import historyReducer from "./reducers/historyReducer";
import invoiceReducer from "./reducers/invoiceReducer";
import scheduleReducer from "./reducers/scheduleReducer";
import overviewReducer from "./reducers/overviewReducer";
import authenticateReducer from "./reducers/authenticateReducer";

const reducers = combineReducers({
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

export const makeStore = () => {
    return configureStore({
        reducer: reducers
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']