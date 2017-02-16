
module app {
    import CardComponent = app.components.CardComponent;
    import RealEstateAdService = app.services.RealEstateAdService;
    import IAdd = app.services.IAdd;

    class AppComponent {

        private element: JQuery;
        private realEstateAdService = new RealEstateAdService();
        private ads: IAdd[] = [];

        constructor(selector: string = "app") {


            this.element = jQuery(selector);

            this.getRealEstateAds();

        }

        /**
         *
         */
        private getRealEstateAds(){

            this.realEstateAdService
                .getAll()
                .then((ads) => {

                    this.ads = ads;

                    this.element.html(this.render());
                    this.afterRender();

                });

        }

        /**
         *
         * @returns {string}
         */
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
                        ${this.renderAds()}
                    </div>
                    
                </div>
                
            `;
        }

        private renderAds() {

            return this.ads.map(ad =>
                `<div class="col s12 m4">
                    <card src="${ad.UrlImagePrincipale}" href="edit.html?id=${ad.Id}" title="${ad.Prix} €">
                        <p>
                            ${ad.Titre}
                        </p>
                    </card>
                </div>`
            ).join('');
        }

        private afterRender() {

            CardComponent.fromSelector("card");
        }
    }

    new AppComponent("app");
}
