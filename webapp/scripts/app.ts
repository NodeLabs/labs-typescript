
module app {
    import CardComponent = app.components.CardComponent;
    import RealEstateAdService = app.services.RealEstateAdService;
    import IAdDetails = app.services.IAdDetails;
    import component = app.decorators.component;
    import Component = app.services.Component;
    import ComponentsFactory = app.services.ComponentsFactory;

    @component('app', CardComponent)
    class AppComponent extends Component {

        private realEstateAdService = new RealEstateAdService();
        private ads: IAdDetails[] = [];

        /**
         *
         */
        onInit() {

            const {type} = this.attrs;

            switch(type) {
                case "edit":
                    const id = window.location.search.match(/id=([^&]+)/)[1];
                    this.getRealEstateAd(id);
                    break;

                default:
                    this.getRealEstateAds();
                    break;
            }
        }

        /**
         *
         */
        private getRealEstateAds() {

            this.realEstateAdService
                .getAll()
                .then((ads) => {

                    console.log('ADS =>', ads);
                    this.ads = ads;

                    this.render();
                });

        }

        /**
         *
         * @param id
         */
        private getRealEstateAd(id) {

            console.log(id);
        }

        /**
         *
         * @returns {string}
         */
        render(): string {

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

    }

    ComponentsFactory.boostrap(AppComponent);
}
