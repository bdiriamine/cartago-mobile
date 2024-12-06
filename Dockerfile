# dockerfile for carthago deploy.
FROM node:16.13 as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build

FROM nginx:latest
# fix dist source & resolve name of cartago mobile, project.
COPY --from=build /usr/local/app/dist/cartago-mobile /usr/share/nginx/html
RUN sed -i 's/\(index.*\)/try_files\ \$uri\ \$uri\/\ \/index.html;/' /etc/nginx/conf.d/default.conf
EXPOSE 80
