# Fase 1: Build del proyecto
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig.* ./
COPY . .

RUN npm install
RUN npm run build

# Fase 2: Contenedor Nginx para servir el contenido
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Remove default nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

# Add custom nginx.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
