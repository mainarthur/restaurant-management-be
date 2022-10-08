FROM node:16-alpine as app

WORKDIR /app
COPY package* .
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
ENTRYPOINT ["node", "dist/main"]