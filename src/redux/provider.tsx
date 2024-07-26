'use client';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { useEffect, useRef } from 'react';
import { setupListeners } from "@reduxjs/toolkit/query";
import { PersistGate } from 'redux-persist/integration/react';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
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

	return (
		<Provider store={storeRef.current}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}