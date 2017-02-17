
module app.components {

    import IComponent = app.interfaces.IComponent;
    import getAttributes = app.utils.getAttributes;
    import component = app.decorators.component;
    import Component = app.services.Component;
    import RealEstateAdService = app.services.RealEstateAdService;
    import IAdDetails = app.services.IAdDetails;

    @component('ad-details')
    export class AdDetailsComponent extends Component {

        private realEstateAdService = new RealEstateAdService();
        private currentAd: IAdDetails;

        onInit() {

            this.realEstateAdService
                .getById(this.attrs['ad-id'])
                .then(ad => {
                    console.log(ad);
                    this.currentAd = ad;
                    this.render();
                });

        }

        /**
         *
         * @returns {string}
         */
        render(): string {

            if (this.currentAd === undefined) return "";


            return `
                
                <a href="/" class="waves-effect waves-light btn-floating cyan accent-4"><i class="material-icons left">fast_rewind</i></a>

                <h4>${this.currentAd.Titre}</h4>
                
                <div class="carousel carousel-slider center" data-indicators="true">
                    ${this.renderPictures()}
                </div>
                
                <div>
                    <div class="chip">
                        ${this.currentAd.Prix} €
                    </div>
                    
                    <div class="chip">
                        ${this.currentAd.Surface} m<sup>2
                    </div>
                    
                    <div class="chip">
                        ${this.currentAd.NbrPieces} pièce(s)
                    </div>
                    
                    <div class="chip">
                        ${this.currentAd.Etage} étage
                    </div>
                
                </div>
                
                
                <p>
                    ${this.currentAd.Descriptif}                
                </p>
            
                
            `;
        }

        renderPictures() {

            return this.currentAd.ListImagesUrl.map((picture, index) =>
                `<div class="carousel-item" href="#${index}!" style="background-image: url(${picture})"></div>`
            ).join('');

        }

        afterRender() {

            (this.element.find('.carousel') as any).carousel({
                fullWidth: true
            });

        }
    }

}