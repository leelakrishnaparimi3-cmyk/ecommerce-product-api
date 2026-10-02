FROM node:24-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_ENV=development
ENV DB_HOST=localhost
ENV APP_PORT=8080

EXPOSE 8080

CMD ["npm", "start"]