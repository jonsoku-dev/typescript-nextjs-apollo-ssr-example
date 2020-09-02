# Create Project
```bash
$ npx create-next-app --example with-typescript graphql-nextjs-typescript
```

# yarn add
## Dev Dependencies
```bash
$ yarn add -D @graphql-codegen/cli @graphql-codegen/fragment-matcher @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @types/graphql @types/node @types/react @types/react-dom @types/styled-components @typescript-eslint/eslint-plugin @typescript-eslint/parser babel-plugin-styled-components eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react graphql-codegen-typescript-operations babel-plugin-styled-components prettier typescript
```
## Dependencies
```bash
$ yarn add @apollo/client apollo-link-context apollo-link-error graphql next react react-dom styled-components
```

# rc
## .babelrc
```json
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "babel-plugin-styled-components",
      {
        "ssr": true,
        "displayName": true,
        "preprocess": false
      }
    ]
  ]
}
```
## .eslintrc.js
```js
module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    settings: {
        react: {
            version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    },
    plugins: [
        "@typescript-eslint",
        "prettier"
    ],
    extends: [
        "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    },
};
```

## .prettierrc.js
```js
module.exports = {
    semi: true,
    trailingComma: "all",
    singleQuote: true,
    printWidth: 120,
    tabWidth: 4
};
```

# etc
## codegen.yml
```bash
$ yarn graphql-codegen init
```
```yaml
overwrite: true
schema: "http://localhost:4000/graphql"
documents: "graphql/**/!(*.local).graphql"
generates:
  generated/apolloComponents.tsx:
    config:
      noNamespaces: true
    plugins:
      - "typescript"
      - "typescript-operations"
      - "typescript-react-apollo"
      - "fragment-matcher"

```

## tsconfig.json
```json
{
  "compilerOptions": {
    "allowJs": true,
    "alwaysStrict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "lib": ["dom", "es2017"],
    "module": "esnext",
    "moduleResolution": "node",
    "noEmit": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "esnext"
  },
  "exclude": ["node_modules"],
  "include": ["**/*.ts", "**/*.tsx"]
}

```