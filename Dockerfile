FROM node:20

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json ./
COPY backend/package.json ./backend/
COPY backend/tsconfig.json ./backend/

RUN npm install -g pnpm && pnpm install

COPY backend ./backend

WORKDIR /app/backend

EXPOSE 3001

CMD ["pnpm", "run", "dev"]
