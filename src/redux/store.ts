import { configureStore } from '@reduxjs/toolkit';
import siderReducer from './reducers/siderReducer';
import categoryReducer from './reducers/categoryReducer';
import serviceReducer from './reducers/serviceReducer';
import customerReducer from './reducers/customerReducer';
import userReducer from './reducers/userReducer';
import appointmentReducer from './reducers/appointmentReducer';
import historyReducer from './reducers/historyReducer';
import invoiceReducer from './reducers/invoiceReducer';
import scheduleReducer from './reducers/scheduleReducer';
import authReducer from './reducers/authReducer';
import overviewReducer from './reducers/overviewReducer';

const reducers = {
    appointment: appointmentReducer,
    auth: authReducer,
    category: categoryReducer,
    customer: customerReducer,
    history: historyReducer,
    invoice: invoiceReducer,
    overview: overviewReducer,
    schedule: scheduleReducer,
    service: serviceReducer,
    sider: siderReducer,
    user: userReducer,
};

const store = configureStore({
    reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;