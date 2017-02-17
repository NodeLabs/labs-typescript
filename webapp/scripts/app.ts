
module app {
    import CardComponent = app.components.CardComponent;
    import RealEstateAdService = app.services.RealEstateAdService;
    import IAdDetails = app.services.IAdDetails;
    import component = app.decorators.component;
    import Component = app.services.Component;
    import ComponentsFactory = app.services.ComponentsFactory;
    import InputSearchComponent = app.components.InputSearchComponent;
    import IAddRequest = app.services.IAdRequest;
    import AdDetailsComponent = app.components.AdDetailsComponent;

    @component('app', CardComponent, InputSearchComponent, AdDetailsComponent)
    class AppComponent extends Component {

        private realEstateAdService = new RealEstateAdService();
        private ads: IAdDetails[] = [];
        private currentAdId: string;

        private searchOptions: IAddRequest = {
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

            const {type} = this.attrs;

            switch(type) {
                case "edit":
                    this.currentAdId = window.location.search.match(/id=([^&]+)/)[1];
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
                    
                    ${this.renderAds()}
                    ${this.renderAd()}
                    
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

            if (this.ads.length === 0) return "";

            let content = `<h2>Liste des annonces</h2>
                    
                    <div class="row">`;

            content += this.ads.map(ad =>
                `<div class="col s12 m4">
                    <card src="${ad.UrlImagePrincipale}" href="edit.html?id=${ad.Id}" title="${ad.Prix} €">
                        <p>
                            ${ad.Titre}
                        </p>
                    </card>
                </div>`
            ).join('');

            return content + `</div>`;
        }

        private renderAd() {

            if (this.currentAdId === undefined) return "";

            return `<ad-details ad-id="${this.currentAdId}"></ad-details>`;

        }
    }

    ComponentsFactory.boostrap(AppComponent);
}
