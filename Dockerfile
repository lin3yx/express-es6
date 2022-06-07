# Build the base image
FROM node:16.15.1-alpine AS build-stage

# Create a directory to store the build context
WORKDIR /server
# Bundle the application source code into the build context
COPY . .
# Build the application
RUN yarn install
RUN yarn build

# Serve the application
FROM node:16.15.1-alpine AS server

WORKDIR /server

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

COPY package.json .
COPY yarn.lock .

RUN yarn install --production

COPY --from=build-stage /server/dist ./dist
COPY /config/${NODE_ENV}.json ./config/${NODE_ENV}.json

# Expose the application to the host
EXPOSE 3000

CMD ["yarn", "start"]