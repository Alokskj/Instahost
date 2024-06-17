FROM node:20-alpine as development

RUN apk update && apk add --no-cache git

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine as production

RUN apk update && apk add --no-cache git

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=development /app/dist ./

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 5000

CMD [ "node", "index.js" ]
