import { registerRemotes } from '@module-federation/enhanced/runtime';

let REMOTE_URL = 'http://localhost:3000/remoteEntry.js';

try {
	const response = await fetch('/api/remote-url');
	if (!response.ok) {
		throw new Error(`Unable to fetch /api/remote-url. Status: ${response.status}`);
	}
	const data = await response.json();
	REMOTE_URL = data.url;
} catch (err) {
	console.error('Unable to fetch remote url from /api/remote-url', err);
	REMOTE_URL = 'http://localhost:3000/remoteEntry.js';
}


console.log('REMOTE_URL', REMOTE_URL);

registerRemotes([
	{
		name: 'remote_app',
		entry: REMOTE_URL,
	},
], { force: true });
