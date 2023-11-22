
# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.9.0
FROM node:${NODE_VERSION}-alpine as base
ARG PORT=3000
ENV NODE_ENV=production
WORKDIR /geoforecast

FROM base as builder
RUN apk --no-cache add openssh g++ make python3 git

COPY package*.json  /geoforecast
COPY yarn.lock  /geoforecast

RUN yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=false 

COPY . .
RUN yarn build 

# Run
FROM base
ENV PORT=$PORT
ENV COSMOS_DB=earthquake
ENV COSMOS_CONTAINER_ID=events
ENV COSMOS_ENDPOINT=https://earthquake.documents.azure.com:443/
COPY --from=builder /geoforecast/.output /geoforecast/.output
CMD [ "node", ".output/server/index.mjs" ]