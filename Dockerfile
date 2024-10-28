# Use the official Node.js image (Alpine-based)
FROM node:20-alpine as development

# Install git and dependencies for Playwright
RUN apk update && apk add --no-cache \
    git \
    udev \
    nss \
    freetype \
    ttf-freefont \
    harfbuzz \
    libx11 \
    xvfb-run

WORKDIR /app

COPY package*.json ./

# Install development dependencies
RUN npm install

COPY . .

# Build the application
RUN npm run build

# build the client

RUN cd ./client && npm install && npm run build

# Production stage
FROM mcr.microsoft.com/playwright:v1.48.1-focal as production

ENV PORT=80

WORKDIR /app

COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

COPY --from=development /app/dist ./api

COPY --from=development ./app/client/dist ./client/dist

WORKDIR /app/api

EXPOSE $PORT

CMD ["node", "index.js"]
