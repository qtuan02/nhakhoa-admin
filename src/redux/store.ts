import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/rootReducer";
import { createWrapper } from 'next-redux-wrapper';
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";


const persistConfig = {
    key: "primary",
    version: 1,
    storage,
    whitelist: ["authenticate"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            })
    });
}

export const wrapper = createWrapper(makeStore, { debug: true });

export const store = makeStore();
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;