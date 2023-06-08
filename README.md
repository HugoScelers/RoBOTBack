# Back-end

# Fichiers
## app.js
Ce fichier contient le code principal de l'application. Il initialise la connexion à la base de données, configure les routes de l'API et la documentation Swagger, et démarre le serveur Express.

## chat.js
Ce fichier définit le modèle "Chat" utilisé dans l'application. Il utilise Sequelize pour définir la structure de la table et gérer les opérations CRUD (create, read, update, delete) associées au modèle.

## controller/index.js
Ce fichier contient le contrôleur pour les opérations liées au modèle "Chat". Il définit différentes fonctions pour créer, récupérer, mettre à jour et supprimer des enregistrements de la table "Chat".

## routes/index.js
Ce fichier configure les routes de l'API pour les opérations liées au modèle "Chat". Il utilise le contrôleur du modèle pour gérer les requêtes et les réponses.

# Utilisation
Lien Swagger : https://api-robot.onrender.com/api/docs/

# Liens API
- **POST** https://api-robot.onrender.com/api/v1/create/chats : Crée un nouvel enregistrement.
- **GET** https://api-robot.onrender.com/api/v1/chats : Récupère tous les enregistrements.
- **GET** https://api-robot.onrender.com/api/v1/chats/{id} : Récupère un enregistrement par son ID.
- **PUT** https://api-robot.onrender.com/api/v1/update/chats/{id} : Met à jour un enregistrement par son ID.
- **DELETE** https://api-robot.onrender.com/api/v1/delete/chats/{id} : Supprime un enregistrement par son ID.