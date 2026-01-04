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
			name: 'remote_app',
			filename: 'remoteEntry.js',
			exposes: {
				'./InsuranceForm': './src/components/InsuranceForm.jsx',
			},
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
			},
		}),
	],
	html: {
		title: 'Remote App',
	},
	output: {
		assetPrefix: 'auto',
	},
	server: {
		port: 3000,
		proxy: {
			'/api': 'http://localhost:4000',
		}
	}
});
