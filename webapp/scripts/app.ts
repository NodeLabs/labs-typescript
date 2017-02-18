
module app {
    import CardComponent = app.components.CardComponent;

    class AppComponent {

        private element: JQuery;

        constructor(selector: string = "app") {


            this.element = jQuery(selector);
            this.element.html(this.render());

            this.afterRender();

        }

        private render(): string {
            return `
                <nav class="navbar">
                    <div class="nav-wrapper">
                        <a href="/" class="brand-logo">
                            <i class="valtech-logo--header glyph" data-icon="valtech-logo" aria-hidden="true"></i>
                        </a>
                    </div>
                    
                </nav>
                
                <div class="container">
                    <h2>Liste des annonces</h2>
                    
                    <div class="row">
                        <div class="col s12 m4">
                            <card src="images/6.jpeg" href="/edit.html" title="Titre 1">
                                <p>Voici un exemple de carte</p> 
                            </card>
                        </div>
                        
                        <div class="col s12 m4">
                            <card src="images/6.jpeg" href="/edit.html" title="Titre 2">
                                <p>Voici un exemple de carte 2</p> 
                            </card>
                        </div>
                    </div>
                    
                </div>
                
            `;
        }

        private afterRender() {

            CardComponent.fromSelector("card");
        }
    }

    new AppComponent("app");
}
