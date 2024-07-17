# Utilise l'image officielle de Node.js comme image de base
FROM node:lts

# Répertoire de travail
WORKDIR /app

# Copie package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste de l'application
COPY . .

# Compile l'application pour la production
RUN npm run build

# Utilise une image légère pour servir l'application
FROM nginx:alpine

# Copie les fichiers compilés dans le dossier de Nginx
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose le port 80
EXPOSE 80

# Démarre Nginx
CMD ["nginx", "-g", "daemon off;"]
