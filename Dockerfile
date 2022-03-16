FROM node:14.18.3-alpine3.14 AS development
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=development /usr/src/app/dist ./
CMD ["nginx", "-g", "daemon off;"]
