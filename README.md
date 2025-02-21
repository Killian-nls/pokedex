# Pokedex

## Description
Ce projet est une application de Pokédex permettant aux utilisateurs de rechercher, voir et capturer des Pokémon. Il inclut également des fonctionnalités de gestion de profil de dresseur et un chat en temps réel.

## Backend

### Fonctionnalités
- **Connexion et inscription** : Connectez-vous ou inscrivez-vous pour accéder à votre Pokédex personnel.
- **Gestion de profil de dresseur** : Créez et mettez à jour votre profil de dresseur avec un nom et une image de profil.
- **Chat en temps réel** : Discutez avec d'autres utilisateurs connectés via un chat en temps réel.

### Installation
1. Clonez le dépôt :
    ```bash
    git clone https://github.com/Killian-nls/pokedex.git
    cd pokedex
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```

3. Configurez les variables d'environnement :
    Générer un token API
    ```bash
    node keygen.js
    ```
    Copiez le fichier `.env.example` en `.env` et remplissez les valeurs appropriées :
    ```example
    TOKEN_SECRET="94ce0193...8qs1"
    ```
4. Démarrez la base de données :
    ```bash
    ./[MONGOD_PATH]/bin/mongod --dbpath data
    ```

4. Démarrez le serveur :
    ```bash
    npm run start
    ```

### Endpoints de l'API

#### Utilisateurs
- **POST /users/register** : Inscription d'un nouvel utilisateur.
- **POST /users/login** : Connexion d'un utilisateur.
- **GET /users** : Récupère tous les utilisateurs (admin uniquement).
- **GET /users/:id_or_mail** : Récupère un utilisateur par ID ou email.
- **PUT /users/:id** : Met à jour un utilisateur par ID.
- **DELETE /users/:id** : Supprime un utilisateur par ID.

#### Dresseurs
- **GET /api/trainers** : Récupère tous les dresseurs (admin uniquement).
- **POST /api/trainers** : Ajoute un nouveau dresseur.
- **GET /api/trainers/search** : Récupère un dresseur par nom d'utilisateur.
- **GET /api/trainers/:id** : Récupère un dresseur par ID.
- **PUT /api/trainers/:id** : Met à jour un dresseur par ID.
- **DELETE /api/trainers/:id** : Supprime un dresseur par ID.
- **POST /api/trainers/mark** : Marque un Pokémon comme capturé par un dresseur.
- **POST /api/trainers/see** : Marque un Pokémon comme vu par un dresseur.

#### Pokémon
- **GET /api/pkmn/types** : Récupère tous les types de Pokémon.
- **POST /api/pkmn** : Ajoute un nouveau Pokémon (admin uniquement).
- **GET /api/pkmn/all** : Récupère tous les Pokémon.
- **POST /api/pkmn/region** : Ajoute une région à un Pokémon (admin uniquement).
- **GET /api/pkmn/search** : Recherche des Pokémon par nom partiel et types.
- **GET /api/pkmn** : Récupère un Pokémon par nom ou ID.
- **DELETE /api/pkmn** : Supprime un Pokémon par ID (admin uniquement).
- **PUT /api/pkmn** : Met à jour un Pokémon par ID (admin uniquement).
- **DELETE /api/pkmn/region** : Supprime une région d'un Pokémon (admin uniquement).

### Scripts
- `npm start` : Démarre l'application en mode production.
- `npm run build` : Compile le TypeScript en JavaScript.
- `npm run dev` : Démarre l'application en mode développement avec rechargement à chaud.

### Dépendances
- `bcrypt` : Bibliothèque pour le hachage de mots de passe.
- `cors` : Middleware pour permettre les requêtes cross-origin.
- `dotenv` : Charge les variables d'environnement depuis un fichier `.env`.
- `express` : Framework web pour Node.js.
- `express-handlebars` : Moteur de template pour Express.
- `jsonwebtoken` : Bibliothèque pour la création et la vérification de tokens JWT.
- `mongoose` : ODM pour MongoDB.
- `nodemon` : Outil pour redémarrer automatiquement le serveur lors de modifications de fichiers.
- `ws` : Bibliothèque pour les WebSockets.

## Frontend

### Documentation du Frontend

Pour plus de détails sur la configuration et l'utilisation du frontend, veuillez consulter le [README du frontend](front/README.md).

## Développeur
- **Killian Mathé**
  - [Portfolio](https://killian-mathe.fr)
  - [GitHub](https://github.com/Killian-nls/pokedex)

## Licence
Ce projet est sous licence ISC.