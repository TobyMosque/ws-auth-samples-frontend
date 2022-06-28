FROM node:lts-alpine as global-deps-stage
RUN npm i --location=global @quasar/cli@latest

FROM global-deps-stage as develop-stage
WORKDIR /src
COPY package.json ./
COPY yarn.lock ./
COPY frontend/package.json ./frontend/
COPY . .

FROM develop-stage as local-deps-stage
RUN yarn

FROM local-deps-stage as build-stage
RUN yarn frontend:build

FROM node:lts-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /src/frontend/dist/ssr .
RUN yarn --prod
EXPOSE 3000
CMD ["node", "index.js"]