// @ts-check
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { dependencies } from './package.json';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
	plugins: [
		pluginReact(),
		pluginModuleFederation({
			name: 'host_app',
			shared: {
				react: {
					singleton: true,
					eager: true,
					requiredVersion: dependencies['react'],
				},
				'react-dom': {
					singleton: true,
					eager: true,
					requiredVersion: dependencies['react-dom'],
				},
			}
		}),
	],
	html: {
		title: 'Host App',
	},
	output: {
		assetPrefix: 'auto',
	},
	server: {
		port: 3001,
		proxy: {
			'/api': 'http://localhost:4001',
		}
	},
});
