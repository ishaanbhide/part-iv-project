FROM node:20-alpine as build-client
WORKDIR /usr/src/app
COPY client-map/package*.json ./
RUN npm install
COPY client-map/ ./
RUN npm run build

FROM node:20-alpine as build-server
WORKDIR /usr/src/app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./
RUN npm run build

WORKDIR /usr/src/app/
COPY --from=build-client /usr/src/app/dist ./client-map/dist

EXPOSE 3001

WORKDIR /usr/src/app/server
ENV NODE_ENV production
CMD ["npm", "start"]