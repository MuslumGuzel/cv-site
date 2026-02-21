FROM node:22-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install

COPY . .

ARG SITE_URL=https://muslumguzel.com
ARG SITE_BASE=/
ENV SITE_URL=$SITE_URL
ENV SITE_BASE=$SITE_BASE

RUN npm run build

FROM nginx:1.27-alpine AS runtime

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
