# Etapa 1: Build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 👉 Si usas Vite, reemplaza por: npm run build
RUN npm run build

# Etapa 2: Servidor nginx
FROM nginx:alpine

# El contenido compilado se copia al directorio público de NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Opcional: configuración personalizada de NGINX
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3007

CMD ["nginx", "-g", "daemon off;"]
