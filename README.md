# TS-COMMON

## Requirements

- TypeScript version: >=3.2.2
- ECMAScript target version: ES2017

## Recommendations

- **Conventions over configuration**
- **No sequential coupling**. See https://en.wikipedia.org/wiki/Sequential_coupling
- **No object inheritance**. Use
  - composition,
  - unions, or
  - discriminated unions
- **No `any` type**, use `unknonw` instead
- **Use read only types**.
  - `ReadonlyArray<T>` instead of `T[]`,
  - `Tuple2<A, B>` instead of `[A, B]` (see `ts-common/tuple`),
  - `readonly` properties.
- **No `var`**. Use `const` instead. In some cases, use `let`.
- **No `export class`.** Use `export interface` and `export function` instead.
- **No `null`.** Use `undefined` instead.
- **String index property type should be a superset of `undefined`**.
  - Incorrect `{ [key: string]: T }`
  - Correct `{ [key: string]: undefined|T }`
- **No `lodash`.**. Use native lazy TypeScript libraries (such as `ts-common/iterator`) or `lazy.js`.
- **No `throw`.** Alternatives
  - return errors,
  - use callback function (dependency injection).
- **No `clone`, `cloneDeep`.** Use immutable data to avoid cloning.
- **No `Symbol("...")`.** Use `Symbol.for("...")` instead.
- **No `{ function(); }` declaration in the interface.** Use `{ readonly property: () => void }` instead.

## TypeScript Repository Initialization

1. `npm init`
1. `npm install -D typescript nyc mocha chai @types/mocha mocha-junit-reporter mocha-multi-reporters`
1. `package.json`:
    ```json
    "scripts": {
        "tsc": "tsc",
        "test": "tsc && nyc mocha ./dist/test/*.js --reporter mocha-multi-reporters --reporter-options configFile=mocha-multi-reporters.json",
        "prepack": "npm install && tsc"
    },
    "nyc": {
        "reporter": [
            "html",
            "text",
            "cobertura"
        ],
        "include": [
            "dist/*.js"
        ],
        "check-coverage": true,
        "lines": 100,
        "statements": 100,
        "functions": 100,
        "branches": 100
    },
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "files": [
        "dist/index.d.ts",
        "dist/index.d.ts.map",
        "dist/index.js.map",
        "dist/index.js",
        "src/index.ts"
    ],
    ```
1. `npm run tsc -- --init`
1. [tsconfig.json](examples/tsconfig.json)
1. Create `src/index.ts`
1. `.gitignore`:
    ```
    *.js
    *.d.ts
    *.map
    test-results.xml
    ```
 1. [mocha-multi-reporters.json](examples/mocha-multi-reporters.json)
 1. [azure-pipelines.yml](examples/azure-pipelines.yml)

 ## Optional

 1. Save the Visual Studio Code workspace.
