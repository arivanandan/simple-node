module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended",
    "plugin:node/recommended"
  ],
  "env" : {
    "browser" : true,
    "node" : true,
    "es6" : true
  },
  "rules" : {
    "no-unused-vars" : 2,
    "no-undef" : 2,
    "strict": 0,
    "node/no-unsupported-features/es-syntax": [
      "error",
      {
        "ignores": ["modules"]
      }
    ]
  },
  "parserOptions": {
    "sourceType": "module",
    "babelOptions": {
      "configFile": "./babel.config.js",
    },
  },
}