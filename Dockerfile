FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN HUSKY=0 npm ci --omit=dev
COPY . .
EXPOSE 9000
CMD ["node", "express.js"]
