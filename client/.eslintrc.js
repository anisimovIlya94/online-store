module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: ["error", 4], // Отступ количество пробелов
        semi: [2, "always"], // Точка с запятой в конце строки
        "space-before-function-paren": ["error", "never"],

        // Использование двойных кавычек
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        // suppress errors for missing 'import React' in files
   "react/react-in-jsx-scope": "off",
   // allow jsx syntax in js files (for next.js project)
  "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], //should add ".ts" if typescript project
    }
};
