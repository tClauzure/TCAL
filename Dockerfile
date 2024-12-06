# Utilise une image de Node.js
FROM node:18

# Crée un répertoire de travail
WORKDIR /app

# Copie package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tous les fichiers dans le conteneur
COPY . .

# Compile TypeScript en JavaScript
RUN npm run build

# Expose le port utilisé par l'application
EXPOSE 3000

# Commande pour lancer l'application compilée
CMD ["npm", "start"]
