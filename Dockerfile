FROM node:8
WORKDIR /home/niveus/blog
COPY package.json /home/niveus/blog/
RUN npm install && npm install express && npm install path
COPY . /home/niveus/blog/
RUN npm run build
CMD node index.js
EXPOSE 8081
