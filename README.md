# App - front-end client

## Online development

The easiest way to develop is to use the online environment `Codesandbox`.

### Requirements

- Browser (Chrome, Safari)

### Deployment Environment

1. Go to https://codesandbox.io/s/github/DVitaliy/aeroedge
2. Create fork
3. Copy and rename `.env.example` to `.env.development.local` ([more info about `env`](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables#what-other-env-files-can-be-used))
4. Set `REACT_APP_HOST_BACKEND` value at the `.env.development.local` file

## Local development

### Requirements

- node >= 10
- Editor (Sublimet Text)
  - ESLint
  - JsPrettier
  - Babel
- Browser (Chrome, Safari)
  - [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
  - [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

### Deployment Environment

```
git clone git@github.com:DVitaliy/aeroedge.git
cd aeroedge/
cp .env.example .env.development.local
npm start
```

### Build (production environment)

```
cp .env.example .env.production
npm build
```

### Tech

- [Materialize](https://materializecss.com/) - A modern responsive front-end framework based on Material Design
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
