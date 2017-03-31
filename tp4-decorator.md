# TP 4 - Les décorateurs

L'idée est de déléguer la création de composant à un factory que l'on nommera `ComponentsFactory`.

Cette factory sera ni plus ni moins qu'un registre de composant collecté par le décorateur `@component`.

Voici un exemple de ce qui sera attendu :

```typescript
@component('card')
export class CardComponent extends Component {
   
    
    render() {
        return "Hello card";
    }
}

@component('app', Card)
export class AppComponent extends Component {
    
    render() {
        return `
            <card></card>  
        `;
    }
    
}

ComponentsFactory.bootstrap(AppComponent);
```

> Cette exemple va intercepter tous les éléments `card` et créer une nouvelle instance de `CardComponent`.

### Création du ComponentsFactory

Dans le dossier `services` nous allons créer un nouveau fichier `ComponentsFactory.ts`.

Voici une partie de l'implémentation de la factory :

```typescript
module app.services {

    export class ComponentsFactory {
        private static components = new Map<string | any, any | string>();

        /**
         * Add a new component in registry.
         */
        static add(selector: string, target: any, childrens: any[] = []) {

            target.$childrens = childrens;

            this.components.set(selector, target);
            this.components.set(target, selector);
        }

    }
}
```

### Création du décorateur

Maintenant nous allons développer le décorateur de classe pour collecter les classes auxquelles il sera associé.

À partir de l'exemple donné dans le cours, créez le décorateur ! Ce décorateur aura deux paramètres :

* selector : le selecteur css associé à la classe composant,
* dependencies : Aggregateur contenant la liste des composants utilisés par la classe en court.

## Modification de l'application

Une fois votre décorateur réalisé, nous allons l'utiliser sur la classe `CardComponent` et `AppComponent`.
Ajoutez donc votre décorateur `@component` comme présenté dans le premier exemple et vérifiez que le décorateur fonctionne.

> Si vous souhaitez tester votre décorateur, vous pouvez ajouter un console.log() pour voir si votre composant est bien collecté.

A se stade, nous n'avons implémenté qu'une partie de la logique. Le décorateur fait ce qu'on lui demande, mais il fait
développer un peu notre `ComponentsFactory` pour qu'il gère complétement le cycle de vie de nos composants.

Nous allons commencer par simplifier nos composants et déléguer un maximum de traitement vers la classe `Component` et `ComponentsFactory`.

### Utilisation de classe abstraite

L'utilisation de classe de abstraite permet de fournir une classe de base contenant un certain nombre de fonctionnalité commune à un type
de classe, ici les composants.

Voici les possibilités d'une classe abstraite :

* Ne peut être instancié directement. Elle doit donc être étendu (héritage).
* Elle contient des attributs et méthodes avec implémentation.
* Elle peut définir des méthodes abstraites. Ainsi une méthode abstraite doit obligatoirement être implémenté dans la classe fille.

Nous allons donc implémenter cette classe ensemble ! Elle aura pour objectifs :

* De construire l'élément jQuery,
* Exposer des accesseurs à l'élément jQuery et aux attributs de l'élément,
* Stocker le contenu d'origine de la balise,
* De définir une méthode abstraite `render()`.

Maintenant que notre classe abstraite est défini nous pourrons l'utiliser comme dans l'exemple suivant :

```typescript
@component('card')
export class CardComponent extends Component {
   
    render() {
        return "Hello card";
    }
}
```

### Finalisation de ComponentsFactory

Nous allons maintenant agrémenter la classe ComponentsFactory afin de gérer le cycle de vie suivant :

* Initialisation du premier composant,
* Rendu du composant et des composants utilisés par le composant,
* Rappel après création du rendu du composant en cours.


#### Initialisation du premier composant

Pour gérer l'initialisation du premier composant nous allons rajouter ceci :

```typescript
module app.services {

    export class ComponentsFactory {

        static boostrap(cmpClazz: any) {

            jQuery(document).ready(() => {
                this.render(cmpClazz);
            });

        }

    }
}
```

### Implémentation de la méthode render()

Cette méthode prend la classe d'un composant (`Card` par exemple) et recherche dans le DOM tous les élements correspondant 
au selecteur que nous avons collecté avec le décorateur `@component()`.

```typescript
module app.services {

    export class ComponentsFactory {
    
        static render(cmpClazz: any) {

            const selector: string = this.components.get(cmpClazz) as string;

            this.fromSelector(selector, cmpClazz)
                .forEach(cmp => cmp.render());

        }
    }
}
```

### Implémentation de la méthode fromSelector()

```typescript
module app.services {

    export class ComponentsFactory {
        static fromSelector(selector: string, componentClazz: any) {

            const elements = jQuery(selector);
            const cmps = [];

            elements.each((index, element: Element) => {

                const cmp = new componentClazz(element);

                cmps.push(cmp);

                if (cmp.onInit) {
                    cmp.onInit();
                }

                cmp.$render = cmp.render;

                cmp.render = function() {
                    this.element.html(this.$render());

                    componentClazz.$childrens.forEach(childrenClazz => {

                        ComponentsFactory.render(childrenClazz);

                    });

                    if (this.afterRender) {
                        this.afterRender();
                    }
                };
            });

            return cmps;
        }
    }
}
```

Maintenant notre `ComponentsFactory` est prête il nous reste plus qu'à adapter notre application !

> Correction du TP  : [tp4-solution](https://github.com/NodeAndTyped/labs-typescript/tree/tp4-solution)

[Suivant](https://github.com/NodeAndTyped/labs-typescript/blob/master/tp5-composant-recherche.md)
