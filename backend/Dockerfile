FROM node:22-alpine3.19
WORKDIR /app
COPY package*.json .
RUN npm install 
RUN npm install -g typescript
COPY . .
RUN tsc 
EXPOSE 3000
CMD [ "node", "dist/index.js" ]
