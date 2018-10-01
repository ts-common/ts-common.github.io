# TS-COMMON

## Requirements

- TypeScript version: >=3.0.1
- ECMAScript target version: ES2017

## Recommendations

- **No sequential coupling**. See https://en.wikipedia.org/wiki/Sequential_coupling
- **No object inheritance**. Use
  - composition,
  - unions, or
  - discriminated unions
- **No `any` type**, use `unknonw` instead
- **Use read only types**.
  - `ReadonlyArray<T>` instead of `T[]`,
  - `Tuple2<A, B>` instead of `[A, B]`,
  - `readonly` properties.
- **No `var`**. Use `const` instead. In some cases, use `let`.
- **No `exporte class`.** Use `export interface` and `export function` instead.
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

## TypeScript Repository Initialization

1. `npm init`
1. `npm install -D typescript`
1. `package.json`:
    ```json
    "scripts": {
        "tsc": "tsc",
        "test": "tsc && nyc mocha",
        "prepack": "npm install && tsc"
    },
    "nyc": {
        "reporter": [
            "lcov",
            "text"
         ]
    },
    "files": [
        "index.d.ts",
        "index.d.ts.map",
        "index.js.map",
        "index.ts"
    ],
    ```
1. `npm run tsc -- --init`
1. `tsconfig.json`:
    ```json
    "target": "es2015",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "importHelpers": true

    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    ```
1. Create `index.ts`
1. `.gitignore`:
    ```
    *.js
    *.d.ts
    *.map
    ```
1. `npm install -D nyc`
1. `npm install -D mocha`
