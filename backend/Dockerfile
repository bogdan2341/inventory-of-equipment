FROM node:14.15-alpine
WORKDIR /server
COPY . .
RUN npm install

EXPOSE 4000

CMD ["node","server/server.js"]
