# Pokedex Front

## Description
Ce projet est une interface utilisateur pour un Pokédex, permettant aux utilisateurs de rechercher, voir et capturer des Pokémon. Il inclut également des fonctionnalités de gestion de profil de dresseur et un chat en temps réel.

## Fonctionnalités
- **Recherche de Pokémon** : Recherchez des Pokémon par nom ou par type.
- **Affichage des détails des Pokémon** : Affichez les informations détaillées sur chaque Pokémon, y compris leur taille, poids, types et régions.
- **Gestion de profil de dresseur** : Créez et mettez à jour votre profil de dresseur avec un nom et une image de profil.
- **Connexion et inscription** : Connectez-vous ou inscrivez-vous pour accéder à votre Pokédex personnel.
- **Chat en temps réel** : Discutez avec d'autres utilisateurs connectés via un chat en temps réel.

## Installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Killian-nls/pokedex.git
   cd pokedex/front
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez les variables d'environnement :
   Copiez le fichier `.env.example` en `.env` et remplissez les valeurs appropriées :
   ```example
   POKEMON_API_BASE_URL=http://votre-api-url
   WS_BASE_URL=ws://votre-websocket-url
   ```

4. Démarrez le serveur :
   ```bash
   npm run dev
   ```

## Utilisation
- Accédez à l'application via `http://localhost:3001`.
- Inscrivez-vous ou connectez-vous pour accéder à votre Pokédex.
- Recherchez des Pokémon, affichez leurs détails et marquez-les comme vus ou capturés.
- Gérez votre profil de dresseur.
- Utilisez le chat en temps réel pour discuter avec d'autres utilisateurs.

## Scripts
- `npm start` : Démarre l'application en mode production.
- `npm run build` : Compile le TypeScript en JavaScript.
- `npm run dev` : Démarre l'application en mode développement avec rechargement à chaud.

## Dépendances
- `dotenv` : Charge les variables d'environnement depuis un fichier `.env`.
- `express` : Framework web pour Node.js.
- `express-handlebars` : Moteur de template pour Express.
- `ts-node` : Exécute les fichiers TypeScript directement.
- `ts-node-dev` : Redémarre automatiquement le serveur lors de modifications de fichiers TypeScript.
- `typescript` : Langage de programmation typé pour JavaScript.

## Développeur
- **Killian Mathé**
  - [Portfolio](https://killian-mathe.fr)
  - [GitHub](https://github.com/Killian-nls/pokedex)

## Licence
Ce projet est sous licence ISC.