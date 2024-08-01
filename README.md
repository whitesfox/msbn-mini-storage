# MBSN 3D Configurator

### Frontend

- [React](https://react.dev/learn)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [TailwindCSS](https://tailwindcss.com/)
- [HeadlessUI](https://headlessui.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)

### Commit Guide

In general the pattern mostly looks like this:

```bash
type(scope?): subject  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

Common types according to [commitlint-config-conventional (based on the Angular convention)](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum) can be:

- build
- chore
- ci
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

Reference [Commitlint](https://github.com/conventional-changelog/commitlint/#what-is-commitlint) to commit in development

## Getting Started

### Installation

```bash
npm install
```

### Run the development

```bash
npm run start
```

### Run production

```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
