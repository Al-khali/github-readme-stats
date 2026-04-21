FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm pkg delete scripts.prepare && npm ci
COPY . .
EXPOSE 9000
CMD ["node", "express.js"]
