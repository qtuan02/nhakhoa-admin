'use client';
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { useRef } from "react";

export async function ReduxProvider({ children }: { children: React.ReactNode }) {
	const storeRef = useRef<typeof store>();

	if (!storeRef.current) {
		storeRef.current = await store;
	}

	return (
		<Provider store={storeRef.current}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}