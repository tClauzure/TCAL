# Dockerfile
FROM node:14

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers du projet
COPY package*.json ./
RUN npm install
COPY . .

# Exposer le port de l'application
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
