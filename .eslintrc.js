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
		"no-mixed-spaces-and-tabs": [
			"warn",
			"smart-tabs"
		  ],
		  "eqeqeq": [
			"warn",
			"smart"
		  ],
		  "no-eval": "warn",
		  "quotes": [
			"warn",
			"double"
		  ],
		  "indent": 0,
		  "no-console": 1,
		  "no-debugger": 1,
		  "no-var": "error",
		  "semi": [
			"warn",
			"never"
		  ],
		  "no-trailing-spaces": 0,
		  "eol-last": "warn",
		  "no-underscore-dangle": 0,
		  "no-alert": 0,
		  "no-lone-blocks": 0,
		  "no-unused-vars": "warn",
		  "prefer-template": "warn",
		  "prefer-const": [
			"warn",
			{
			  "destructuring": "any",
			  "ignoreReadBeforeAssign": false
			}
		  ],
		  "react/display-name": [
			1,
			{
			  "ignoreTranspilerName": false
			}
		  ],
		  "react/forbid-prop-types": [
			1,
			{
			  "forbid": [
				"any"
			  ]
			}
		  ],
		  "react/no-danger": 1,
		  "react/no-did-mount-set-state": 1,
		  "react/no-did-update-set-state": 1,
		  "react/no-direct-mutation-state": 1,
		  "react/no-multi-comp": 1,
		  "react/no-set-state": 0,
		  "react/no-unknown-property": 1,
		  "react/prefer-es6-class": 1,
		  "react/prop-types": 0,
		  "react/self-closing-comp": 1,
		  "react/sort-comp": 1,
		  "no-empty": 0
	},
}

