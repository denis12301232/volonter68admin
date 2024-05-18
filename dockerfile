FROM oven/bun as build

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY . .
COPY tsconfig.json .
# COPY public public

RUN bun run build-only

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



