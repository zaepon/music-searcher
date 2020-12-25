FROM node:10 AS build

WORKDIR /app

COPY . .

RUN yarn install && yarn build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/build .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]