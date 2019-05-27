FROM node:8
WORKDIR /home/niveus/done
COPY package.json /home/niveus/done/
RUN npm install && npm install express && npm install path
COPY . /home/niveus/done/
RUN npm run build
CMD node server.js
EXPOSE 8080
