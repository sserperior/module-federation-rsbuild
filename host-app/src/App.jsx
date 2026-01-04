import { lazy, Suspense } from 'react';
import { loadRemote } from '@module-federation/enhanced/runtime';

import './App.css';

await import('./bootstrap');

const App = () => {
	const RemoteInsuranceForm = lazy(() => loadRemote('remote_app/InsuranceForm'));
	return (
		<div>
			<h1>Remote App - Rsbuild with React</h1>
			<Suspense fallback="Loading remote_app/InsuranceForm...">
				<RemoteInsuranceForm title="Host Insurance Form"/>
			</Suspense>
		</div>
	);
};

export default App;