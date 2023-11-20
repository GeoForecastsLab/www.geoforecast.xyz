
FROM node:20-alpine as base
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
COPY --from=builder /geoforecast/.output /geoforecast/.output
CMD [ "node", ".output/server/index.mjs" ]