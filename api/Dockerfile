FROM node:20.11.0-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER root
RUN npm install
COPY --chown=node:node . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]