module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'parser': 'babel-eslint',
	'parserOptions': {
	'sourceType': 'module',
	'allowImportExportEverywhere': true
  },
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'overrides': [
	],
	
	'plugins': [
		'react'
	],
	'rules': {
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'react/prop-types': 0,
        'no-empty': 0
	}
}
