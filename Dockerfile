FROM node:18-alpine3.16 as build
COPY ./package.json ./app/package.json
WORKDIR ./app
RUN npm i
COPY . .
RUN npm run build --omit=dev

FROM nginx:latest
EXPOSE 4200/tcp
COPY --from=build /app/dist/energy-utility-platform-frontend /usr/share/nginx/html
