FROM node:20

WORKDIR /app

COPY . .

RUN npm install -g pnpm && pnpm install

WORKDIR /app/backend

EXPOSE 3001

CMD ["pnpm", "run", "dev"]
