# Utilise une image Node.js de base
FROM node:18

# Crée et passe dans le dossier de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tout le reste des fichiers
COPY . .

# Compile les fichiers TypeScript
RUN npm run build

# Expose le port 3000
EXPOSE 3000

# Commande de démarrage par défaut
CMD ["npm", "run", "start"]
