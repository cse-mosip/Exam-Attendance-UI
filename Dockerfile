FROM node:alpine as build
WORKDIR /app
COPY package.json .
RUN npm install
ENV REACT_APP_BACKEND_URL=http://20.235.163.35:8080
COPY . .
RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html/frontend-service/exam-attendance
RUN rm -f /etc/nginx/conf.d/default.conf
COPY  nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]