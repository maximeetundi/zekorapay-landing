# Image Node.js pour la landing page publique — cible "development" utilisée
# par docker-compose (Nuxt dev server, code monté en volume, hot-reload) ;
# cible "production" pour le serveur Nitro buildé (mode SSR/node-server).

FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g npm@11
COPY package.json package-lock.json* ./

FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]

FROM base AS build
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
