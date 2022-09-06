FROM node:14.15.3-alpine

WORKDIR /app

COPY ./public /app/public
COPY ./src /app/src
COPY ./package.json /app/
COPY ./yarn.lock /app/
COPY ./.env /app/.env

RUN export $(cat .env | xargs) && yarn install && GENERATE_SOURCEMAP=false yarn build

FROM nginx:1.12.2-alpine
COPY --from=0 /app/build /usr/share/nginx/html
COPY ./run.sh /root/
COPY ./nginx.vh.default.conf /etc/nginx/conf.d/default.conf
CMD /bin/sh /root/run.sh

