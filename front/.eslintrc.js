module.exports = {
  extends: ["airbnb", "react", "prettier", "prettier/react"],
  parser: "babel-eslint",
  plugins: ["react", "prettier"],
  parserOptions: {
    sourceType: "module"
  },
  env: {
    es6: true,
    browser: true,
    jasmine: true
  },
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "import/no-dynamic-require": "no",
    "global-require": 0
  }
};
