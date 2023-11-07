# syntax=docker/dockerfile:1.4

ARG NODE_VERSION=18.14.2
FROM node:${NODE_VERSION}-slim as base
ARG PORT=3000
ENV NODE_ENV=production
WORKDIR /src

# Build
FROM base as build
COPY --link package.json package-lock.json ./
COPY --link . .
RUN npm install --omit=dev
RUN npm run build
RUN npm prune

# Run
FROM base
ENV PORT=$PORT
COPY --from=build /src/.output /src/.output
CMD [ "node", ".output/server/index.mjs" ]