"use client";

import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

persistStore(store);
export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}