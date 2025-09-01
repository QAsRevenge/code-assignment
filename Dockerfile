#FROM node:20

#WORKDIR /app

#COPY package.json ./

#RUN npm install -g pnpm && pnpm install --filter ./backend...

#COPY backend ./

#EXPOSE 3001

#CMD ["pnpm", "run", "dev"]


FROM node:20

WORKDIR /app/backend

COPY package.json /app/
COPY pnpm-workspace.yaml /app/
COPY pnpm-lock.yaml /app/
COPY backend/package.json ./
RUN npm install -g pnpm && pnpm install --filter ./backend...

EXPOSE 3001

CMD ["pnpm", "run", "dev"]
