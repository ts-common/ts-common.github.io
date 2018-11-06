# TS-COMMON

## Requirements

- TypeScript version: >=3.1.3
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
- **No `{ function(); }` declaration in the interface.** Use `{ readonly property: () => void }` instead.

## TypeScript Repository Initialization

1. `npm init`
1. `npm install -D typescript nyc mocha chai @types/mocha mocha-junit-reporter`
1. `package.json`:
    ```json
    "scripts": {
        "tsc": "tsc",
        "test": "tsc && nyc mocha ./dist/test/*.js --reporter mocha-junit-reporter",
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
1. `tsconfig.json`:
    ```json
    "target": "es2015",
    "declaration": true,
    "sourceMap": true,
    "declarationMap": true,
    "outDir": "./dist",
    "importHelpers": true

    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    ```
1. Create `src/index.ts`
1. `.gitignore`:
    ```
    *.js
    *.d.ts
    *.map
    test-results.xml
    ```
 1. `azure-pipelines.yml`:
    ```yaml
    pool:
      vmImage: 'Ubuntu 16.04'

    trigger:
    - master

    steps:

    - task: Npm@1
      displayName: 'npm install'
      inputs:
        verbose: false

    - task: Npm@1
      displayName: 'npm test'
      inputs:
        command: custom
        verbose: false
        customCommand: test

    - task: PublishTestResults@2
      inputs:
        testResultsFiles: '**/test-results.xml'
        testRunTitle: 'Test results for JavaScript'

    - task: PublishCodeCoverageResults@1
      inputs:
        codeCoverageTool: Cobertura
        summaryFileLocation: '$(System.DefaultWorkingDirectory)/**/*coverage.xml'
        reportDirectory: '$(System.DefaultWorkingDirectory)/**/coverage'

    - task: Npm@1
      displayName: 'npm pack'
      inputs:
        command: custom
        verbose: false
        customCommand: pack

    - task: CopyFiles@2
      displayName: 'Copy Files to: drop'
      inputs:
        Contents: '*.tgz'
        TargetFolder: drop

    - task: PublishBuildArtifacts@1
      inputs:
        pathtoPublish: $(Build.SourcesDirectory)/drop
    ```
