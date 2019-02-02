# Why

https://github.com/ts-common

- Q. Why a lot of small libraries and small repositories?
  A. Separation of concerns
- Q. Why we can't use existing libraries?
    A. In some cases, we can but there are some advantages to write a new one
        - Typescript
        - lightweight
        - freedom
        - modern concepts
        - practice and learning
- Q. Could we use one monolitic repository?
    A. It will be heavy for development/build/test and it will contain a lot of dependencies which will prevent you to try new concepts.
- Q. Other languages
    A. For example, Rust https://github.com/rust-common
- Q. Challenges
    - 1. GitHub doesn't allow suborgs.
    - 2. Propogate changes. Solutions:
        - semantic versioning
        - https://github.com/ts-common/local-install
