FROM node:lts-alpine

RUN npm install -g pnpm

WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm run build

CMD ["pnpm", "start"]