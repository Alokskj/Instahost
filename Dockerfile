FROM node:20-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine as production

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=development /app/dist ./dist

RUN mkdir -p /public/website

EXPOSE 5000

CMD [ "node", "dist/index.js" ]
