FROM node:14 as builder
RUN mkdir /home/data-management
WORKDIR /home/data-management
COPY package.json package-lock.json ./
RUN npm install 

COPY . .
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /home/data-management/build /usr/share/nginx/html
COPY /public /usr/share/nginx/html/public/
EXPOSE 3000 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]