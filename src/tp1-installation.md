# TP 1 - Installation de l'environnement

## Prérequis

Vérifier que vous avez les éléments suivants d’installé sur votre poste :

* Node v6 ou plus avec la commande npm –v,
* Git, nous l’utiliserons pour récupérer le projet initial,
* Webstorm (ou un autre IDE)

## Installation
### Initialisation du projet

Créez un nouveau projet dans votre IDE. Puis dans le terminal, placez-vous sur votre nouveau projet et lancez la commande suivante :

```bash
npm init
```

> Suivez le guide d'initialisation de la commande. Elle va créer le fichier `package.json` avec les informations du projet.

### Installation des modules

Maintenant nous allons installer les modules nécessaires à un projet TypeScript.

Toujours dans le terminal lancez la commande suivante :

```
npm install -g typescript@2.0 
npm install --save @types/jquery materialize-css
npm install --save-dev connect-history-api-fallback http-proxy-middleware lite-server
tsc --init
```

> Nous travaillerons de préférence avec la version 2.0 de TypeScript

La commande `tsc --init` va créer un nouveau fichier `tsconfig.json`. Ce fichier contient les informations nécessaire 
au compilateur TypeScript pour compiler nos fichiers sources.

En l'état, il nous manque quelques options de compilation dans le `tsconfig.json`.

Voici les options à reporter dans votre `tsconfig.json`: 

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "noImplicitAny": false,
    "lib": [
      "es6",
      "dom",
      "es2015.collection"
    ],
    "types": [
      "jquery"
    ],
    "experimentalDecorators":true,
    "emitDecoratorMetadata": true,
    "sourceMap": true,
    "declaration": false
  },
  "exclude": ["node_modules"]
}
```

> Votre projet est prêt pour compiler du TypeScript

### Création du serveur de développement

Nous allons maintenant mettre en place le serveur de développement.

A la racine de projet, créer le fichier bs-config.js et collez le script suivant :

```javascript
var proxyMiddleware = require('http-proxy-middleware');
var fallbackMiddleware = require('connect-history-api-fallback');

module.exports = {
    "port": 8000,
    "files": [
        "./webapp/**/*.{html,htm,css,js}",
        "./node_modules/**/*.{html,htm,css,js}"
    ],
    "server": {
        "baseDir": "webapp",
        "routes": {
            "/node_modules": "node_modules"
        },

        middleware: {
            1: proxyMiddleware('/api', {
                target: 'http://futurlogement5.azurewebsites.net',
                changeOrigin: true   // for vhosted sites, changes host header to match to target's host
            }),

            2: fallbackMiddleware({
                index: '/index.html',
                verbose: true
            })
        }
    }
};
```

Ensuite il vous faut éditer le `package.json` et ajouter ceci :
```
{
  "scripts": {
     "serve": "lite-server"
  }
}
```

> `scripts` permet d'ajouter de nouvelle commande NPM qui peuvent être appelées en ligne de commande avec `npm run [nom cmd]`.

Notre serveur de développement est prêt. Il nous reste plus qu'à créer un dossier `webapp` avec une première page `index.html`.


### Création de l'application web

Voici à quoi la page d'index doit ressembler :
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>TP</title>
    <!--Import Google Icon Font-->
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="node_modules/materialize-css/bin/materialize.css"  media="screen,projection"/>

    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>

    <app>

    </app>

    <!-- vendor -->
    <script type="text/javascript" src="node_modules/materialize-css/bin/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="node_modules/materialize-css/bin/materialize.js"></script>
    <!-- end vendor -->

    <script type="text/javascript" src="scripts/app.js"></script>
</body>
</html>
```

Ici il nous manque le script `app.js`. Notez que dans la page d'index nous incluerons toujours le fichier javascript généré par TypeScript et non
le fichier `app.ts`. 
 
Dans le dossier `scripts`, créer un nouveau fichier `app.ts`.

L'exercice sera d'intercepter la balise `app` et d'y afficher un `HELLO WORLD` avec jQuery.

> Note : pour lancer votre server `npm run serve`.

> Note 2 : pour compiler votre fichier TypeScript `tsc`.

> Correction du TP : #resources-tp1-installation

[Suivant](tp2-composant.md)
