# App front-end client

## Deployment (Online development environment)

1. Go to https://codesandbox.io/s/github/DVitaliy/aeroedge
2. Create fork
3. Copy and rename `.env.example` to `.env.development.local` ([more info](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables#what-other-env-files-can-be-used))

## Deployment (Local development environment)

```
git clone ssh://git@github app
cd app/
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
