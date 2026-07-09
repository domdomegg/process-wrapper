import globals from 'globals';
import domdomegg from 'eslint-config-domdomegg';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
	...domdomegg,
	{
		files: ['**/*.js'],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
];
