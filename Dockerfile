FROM node:16-alpine3.16 as build
COPY ./package.json ./app/package.json
WORKDIR ./app
RUN npm i
COPY . .
RUN npm run build --prod

FROM nginx:alpine
EXPOSE 8081/tcp
COPY --from=build /app/dist/energy-utility-platform-frontend /usr/share/nginx/html
