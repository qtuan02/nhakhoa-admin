'use client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import store, { persistor } from './store';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<PersistGate
				loading={null}
				persistor={persistor}
			>
				{children}
				<ProgressBar
					height='4px'
					color='#2B5A36'
					options={{ showSpinner: false }}
					shallowRouting
				/>
			</PersistGate>
		</Provider>
	);
}