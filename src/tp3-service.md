# TP 3 
> Création d'un service

Bien que nous n'utilisions pas de framework avancé comme Angular, View.js ou React.js, il est toujours pratique de mettre place
des patterns de conception. Cela permet de structurer rapidement notre code et il est ainsi plus facile à porter vers un autre
framework.

Nous allons donc mettre en place un service qui aura pour objectif d'appeler le webservice `api/serviceannoncesimmobilieres`
pour récupérer la liste des annonces.

Nous verrons comment utiliser la nouvelle API Fetch pour faire une appel Ajax et commment typer une reponse Ajax pour profiter
de l'analyse statique du code proposé par TypeScript et les IDE tels que Webstorm.

### Créer le service

Notre service sera nommé `RealEstateAdService` par convention et aura une methode `getAll()` qui retournera une Promise 
avec pour reponse la liste des annonces.

#### Voici le contrat de service

* Methode : GET
* Url : `api/serviceannoncesimmobilieres`
* Réponse : Liste d'annonce

#### Structure d'une annonce

* Id : number,
* Titre : string,
* Ville : string,
* Latitude : number,
* Longitude : number,
* Achat : boolean,
* Location : boolean,
* Appartement : boolean,
* Maison : boolean,
* Chateau : boolean,
* Prix : number,
* NbrPieces : number,
* Surface : number,
* Etage : number,
* Ascenceur : boolean,
* Terrasse : boolean,
* Parking : boolean,
* Descriptif : string,
* ListImagesUrl : tableau de string,
* UrlImagePrincipale : tableau de string.

### Installation de fetch

```bash
npm install --save whatwg-fetch @types/whatwg-fetch 
```

> N'oubliez pas de rajouter whatwg-fetch à la liste des `types` dans votre `tsconfig.json` ! 

### Exercice 1

A partir de la structure d'annonce créer une interface TypeScript correspondant à sa structure.

### Exercice 2

Créer la classe `RealEstateAdService` avec une methode `getAll()`. La methode getAll() doit utiliser l'API
`fetch` pour appeler le webservice ([documentation](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)).

### Exercice 3

Typer le retour de la methode `getAll()` de façon à ce qu'elle expose une Promise de liste d'annonce.

### Exercice 4

Utiliser la méthode `getAll()` dans l'application pour afficher la liste d'annonce avec notre composant `card`.

> Correction du TP  : #resources-tp3-solution

[Suivant](tp4-decorator.md)
