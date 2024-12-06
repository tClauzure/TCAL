# server
#   npm install -> npm run build -> docker-compose up --build
#   config = Pour les fichiers de configuration (connexion MongoDB)
#   controllers = Pour la logique des routes (ex. : utilisateurs, événements)
#   models = Pour les schémas Mongoose (collections MongoDB)
#   routes = Pour définir les routes de l'API
#   middleware = Pour les middlewares (authentification, validation)
#   .env = Pour les variables d'environnement (ex. : URI MongoDB)
#   server.js = Point d’entrée du serveur

# client->src
#   components = Composants réutilisables (ex. : Navbar, Card)
#   pages = Pages principales (ex. : Events, Groups)
#   services = Appels API pour communiquer avec le backend
#   App.js = Point d’entrée React
#   index.js = Initialisation React