FROM node:16-alpine as base

WORKDIR /app
COPY package* .
RUN npm install
COPY . .
RUN npm run build

FROM base as app

ARG NODE_ENV=production
WORKDIR /app
COPY package* .
RUN npm install
COPY --from=base /app/dist/ /app/
EXPOSE 3000
CMD ["node", "main"]