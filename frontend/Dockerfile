FROM node:22-alpine3.19
WORKDIR /app
COPY package*.json .
RUN npm install 
RUN npm install -g typescript
RUN npm install -g serve
RUN npm install -g pm2
COPY . .
RUN npm run build
EXPOSE 3001
CMD [ "pm2", "serve", "--spa", "--no-daemon", "dist", "3001"]
