## How to create project

- yarn init -y

- yarn add typescript ts-node-dev @types/node tsconfig-paths -D

- yarn tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true

## How to create .gitignore

.idea/
.vscode/
node_modules/
build/
temp/
.env
coverage
ormconfig.json
dist

uploads/*
!uploads/.gitkeep
.docker/dbdata

## How to create server.ts

- Create the src folder on the root project
- Create the server.ts file inside the src folder

## How to setup dev runner

- Add that line on the package.json

"scripts": {
    "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts",
},
## How to run the node server

 - yarn dev

## How to create a migration via typeorm

- yarn typeorm migration:create -n CreateProducts

## How to run a migration

- yarn typeorm migration:run
