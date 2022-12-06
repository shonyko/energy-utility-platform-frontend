FROM node:14-alpine3.15 as build
COPY ./package.json ./app/package.json
WORKDIR ./app
RUN npm i
COPY . .
RUN npm run build --omit=dev

FROM nginx:alpine
EXPOSE 8081/tcp
COPY --from=build /app/dist/energy-utility-platform-frontend /usr/share/nginx/html
