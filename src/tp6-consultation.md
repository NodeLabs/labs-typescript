# TP6 - Visualisation d'une annonce

L'objectif est de visualiser une annonce dans une nouvelle page.

# Exercice 1

Créez la nouvelle page `edit.html` dans lequel vous appelerez le composant `<app type="edit">` avec l'option `edit` par exemple.

> Vous pouvez faire autrement si vous le souhaitez.

# Exercice 2

Il vous faudra récupérer l'id de l'annonce cliqué dans la page précédente et afficher les informations 
de l'annonce.

Vous avez un service web qui permet de récupérer une annonce !

#### Le contrat de service

* Methode : GET
* Url : `api/serviceannoncesimmobilieres/{id}`
* Réponse : Une annonce

Vous devrez donc créer une nouvelle méthode dans `RealEstateAdService` pour récupérer une instance annonce.

A vous de jouer !

# Exercice 3

Vous devez afficher les photos de l'annonce dans un carousel fournit par [Materialize-css](http://materializecss.com/carousel.html).
Ensuite vous devez afficher le détail de l'annonce.

> Correction du TP : #resources-tp6-solution