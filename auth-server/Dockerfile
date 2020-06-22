FROM node:12.18-alpine
# ENV NODE_ENV production

WORKDIR /usr/src/authserver

COPY . .
RUN npm install
WORKDIR /usr/src/authserver/client
RUN npm install
WORKDIR /usr/src/authserver

EXPOSE 3030
CMD npm run dev-start
