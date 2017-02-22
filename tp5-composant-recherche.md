
# TP5 - Rechercher une annonce

Nous allons maintenant créer une composant permettant de rechercher une annonce.
Cette recherche relancera une nouvelle requête avec les critères de recherche saisie.

L'objectif est d'améliorer la méthode `RealEstateAdService.getAll()` afin de proposer
des options de recherche.

#### Rappel : Le contrat de service

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


#### Les paramètres de recherche possibles

* Ville : Nom de la ville de recherche (le service veut un nom exacte),
* Achat : S'agit-il d'un achat (True ou False),
* Location : S'agit-il d'une location (True ou False),
* Appartement : S'agit-il d'un appartement (True ou False),
* Maison : S'agit-il d'une maison (True ou False),
* Chateau : S'agit-il d'un chateau (True ou False),
* PrixMin : Prix minimum du bien recherché,
* PrixMax : Prix maximal du bien recherché,
* SurfaceMin : Surface minimal du bien recherché,
* SurfaceMax : Surface maximal du bien recherché.

> Le service s'attend à avoir toutes les options de recherche !

Exemple d'url : `api/serviceannoncesimmobilieres?Ville=paris&Achat=True&Location=False&Appartement=True&Maison=False&Chateau=False&PrixMin=490578&PrixMax=500000&SurfaceMin=0&SurfaceMax=300`.

### Exercice 1

Créer l'interface `IAdRequest` correspondant aux paramètres.

### Exercice 2

Créer un composant permettant de rechercher les annonces par ville.

> Correction du TP  : [tp5-solution](https://github.com/Romakita/tp-typescript/tree/tp5-solution)

[Suivant](https://github.com/Romakita/tp-typescript/blob/master/tp6-consultation.md)
