
module app {
    import CardComponent = app.components.CardComponent;
    import RealEstateAdService = app.services.RealEstateAdService;
    import IAdd = app.services.IAdDetails;
    import component = app.decorators.component;
    import Component = app.services.Component;
    import ComponentsFactory = app.services.ComponentsFactory;
    import InputSearchComponent = app.components.InputSearchComponent;
    import IAdRequest = app.services.IAdRequest;

    @component('app', CardComponent, InputSearchComponent)
    class AppComponent extends Component {

        private realEstateAdService = new RealEstateAdService();
        private ads: IAdd[] = [];
        private searchOptions: IAdRequest = {
            Ville: "",
            Achat: true,
            Location: false,
            Appartement: true,
            Maison: false,
            Chateau: false,
            PrixMin: 0,
            PrixMax: 10000000,
            SurfaceMin: 0,
            SurfaceMax: 500
        };

        /**
         *
         */
        onInit() {

            this.getRealEstateAds();

        }

        /**
         *
         */
        private getRealEstateAds() {

            return this.realEstateAdService
                .getAll(this.searchOptions)
                .then((ads) => {

                    console.log('ADS found(s) =>', ads);
                    this.ads = ads;

                    this.render();
                });

        }

        /**
         *
         * @param id
         */
        private getRealEstateAd(id) {

            // console.log(id);

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
                        
                        <input-search value="${this.searchOptions.Ville}"></input-search>
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

        /**
         *
         */
        afterRender() {

            this.element
                .find('input-search')
                .on('changeValue', this.onSearchValueChange);

        }

        /**
         *
         * @param event
         * @param value
         */
        private onSearchValueChange = (event, value) => {

            this.searchOptions.Ville = value;
            this.getRealEstateAds()
                .then(() => {

                    this.element.find('input-search input').focus();

                });

        };


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
