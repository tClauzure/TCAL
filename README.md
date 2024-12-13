# server
#   Pour lancer les conteneurs aller dans la racine du projet et faites les commandes suivantes:
#   npm install -> npm run build -> docker-compose up --build
#   bien vérifier que le fichiers .env soit actif et que le dossier dist soit apparu apres le npm run build

#   Pour l'utilisation, Après avoir lancé les conteneurs, je recommande d'utiliser postman pour tester les différentes routes.
#   Il est possible d'utiliser les routes get pour voir les evenements et annonces avec: 
#   http://localhost:5000/api/evenements  &&  http://localhost:5000/api/annonces
#   Pour créer un compte utilisateur il faut utiliser la route: 
#   http://localhost:5000/api/auth/register avec un body {"nom": "John Doe", "email": "john@example.com",  "password": "password123","role": "etudiant"}
#   avec un utilisateur qui a le role étudiant il est possible de créer des annonces, les modifiers et les supprimer.
#   Pour créer un evenements il faut avoir un utilisateur qui ai le role groupe lorsque c'est le cas il faut renseigner dans le body un champs supplémentaire qui est typeGroupe soit en étant association soit ecole.
#   Utiliser la route login avec ce nouvel utilisateur pour récupérer le token de connexion.
#   Lorsque cela est fait il est possible de créer des evenements, les modifiers et les supprimer.


#   models = Pour les schémas Mongoose (collections MongoDB)
#   routes = Pour définir les routes de l'API
#   middleware = Pour les middlewares (authentification, validation)
#   .env = Pour les variables d'environnement (ex. : URI MongoDB)

# client->src
#   components = Composants réutilisables (ex. : Navbar, Card)
#   pages = Pages principales (ex. : Events, Groups)
#   services = Appels API pour communiquer avec le backend
#   App.js = Point d’entrée React
#   index.js = Initialisation React

Compte-rendu du projet d'architecture logicielle

Contexte et objectifs
 Le projet consistait à développer une application d'entraide destinée aux étudiants, permettant de faciliter la création et la gestion d'événements (par exemple, des cours particuliers ou des groupes d'études), ainsi que l’échange ou le don d’objets tels que de la nourriture ou des meubles. L’objectif principal était de proposer une solution conviviale et efficace pour limiter le gaspillage et encourager la collaboration entre étudiants.


Fonctionnalités principales

Pour les étudiants :
Visualisation des différents evenement proposer par les associations et l'école
création et gestion des annonces, qui peuvent etre des don (alimentaire, objet,...etc) ou des séances de travail

Pour l’école (administrateur) :
Gestion des événements et des contenus publiés sur la plateforme pour s’assurer du respect des règles.


Architecture logicielle
 Nous avons structuré et organisé le projet en utilisant des diagrammes C4, qui ont permis de visualiser clairement les différentes couches de l’application :
Context diagram : Présentation générale des parties prenantes et des systèmes impliqués.
(img/contextDiagram.png)
Container diagram : Décomposition en front-end, back-end et base de données.
(img/containerDiagram.png)
Component diagram : Mise en évidence des principales responsabilités au sein du back-end.
(img/componentDiagram.png)


Technologies utilisées
Backend : Node.js avec Express pour construire une API RESTful.
Base de données : MongoDB pour la gestion des données, adaptée à la nature flexible et évolutive des besoins du projet.
Tests unitaires : Jest, pour garantir la fiabilité et la qualité du code.


Design Patterns utilisés
Dans le cadre de ce projet, plusieurs design patterns ont été intégrés pour structurer le code, améliorer sa lisibilité et sa maintenabilité :

Singleton :
 Ce pattern a été utilisé pour la connexion à la base de données MongoDB. Grâce à lui, une seule instance de la connexion est créée et partagée dans toute l'application, ce qui réduit les risques d'erreurs et optimise les performances (toutes les parties utilisent seulement cette connexion).

Factory :
 Le pattern Factory a été utilisé pour centraliser et simplifier la création d’objets, comme les modèles pour les événements, les annonces ou les utilisateurs. Cela permet de gérer facilement les variations dans ces objets et de garantir leur conformité avec les attentes du système.

Chain of Responsibility :
 Ce pattern a été appliqué dans la gestion des validations des données utilisateur ou des annonces avant leur insertion dans la base de données. Les middlewares établissent donc une chaîne pour traiter les requêtes. Chaque étape de validation sera isolée et pourra être réutilisée ou modifiée sans affecter les autres, garantissant ainsi une meilleure modularité.

State :
 Ce pattern a été employé pour gérer l’état des annonces ou des événements (par exemple, brouillon, publié, supprimé). Cela permet de simplifier la logique métier et d’assurer une transition cohérente entre les différents états possibles.

Ces patterns ont permis de concevoir une application plus flexible et robuste, tout en rendant le code plus clair et plus facile à maintenir. Ils ont également contribué à séparer les responsabilités, à limiter le couplage entre les composants et à faciliter l'ajout de nouvelles fonctionnalités.


Approche méthodologique
Nous avons suivi une approche agile, en itérant sur les fonctionnalités et en testant régulièrement pour assurer la conformité avec les objectifs initiaux.

1. Création de la structure de notre application :
    Définition de la structure de dossiers côté serveur (Node.js et Express) et côté client (React).
    Configuration d’un serveur de base avec Express, MongoDB, et React.

2. Configuration de la base de données MongoDB: 
    Définition des schémas pour nos collections (ex. : utilisateurs, événements, groupes, annonces).
    Connection de notre serveur Node.js à MongoDB.

3. Implémentation des routes API (backend) 
    Commencer par les fonctionnalités principales, comme la création d’événements et d’annonces.
    Suivre notre diagramme pour bien structurer les routes et les opérations CRUD (Create, Read, Update, Delete).
    
4. Création des composants et pages (frontend) 
    Affichage des données de l’API, en commençant par les vues les plus importantes (calendrier des événements, pages de groupes, etc.)

5. Sécurité et authentification
    Mettre en place un système de connexion (authentification par JWT par exemple).
    Gérer les autorisations pour limiter certaines actions aux utilisateurs autorisés (ex. : seuls les administrateurs peuvent gérer les événements de l'école).

6. Tests et déploiement
    Mettre en place des tests pour vérifier le bon fonctionnement des principales fonctionnalités.
    Préparer un plan de déploiement sur une plateforme comme Heroku, Vercel ou DigitalOcean pour mettre notre application en ligne.

Bilan
Le projet avait pour but de créer une application fonctionnelle et intuitive qui puisse répondre aux besoins des étudiants tout en permettant à l’école d’avoir un rôle de modération. L’intégration des outils modernes (Node.js, Express, MongoDB) et la rigueur des tests unitaires avec Jest avaient pour but de garantir la robustesse et la maintenabilité de la solution.
Le projet a été l’occasion de mettre en pratique des compétences en architecture logicielle et de découvrir les défis liés au développement d’une application complète avec des technologies modernes.

(lien de notre plan / carte mentale: https://coggle.it/diagram/ZwVH8_QvmfBHVQoH/t/app/67134279eee6f4dfebc32862c59cf8b79aa18bd86aba6ccbf03a3beace8b73e0 )