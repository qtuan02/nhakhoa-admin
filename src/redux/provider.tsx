"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { useEffect, useRef } from "react";
import { persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";

persistStore(store);
export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<typeof store | null>(null);

	if (!storeRef.current) {
		storeRef.current = store;
	}

	useEffect(() => {
		if (storeRef.current != null) {
		  const unsubscribe = setupListeners(storeRef.current.dispatch);
		  return unsubscribe;
		}
	  }, []);
      
    return <Provider store={store}>{children}</Provider>;
}