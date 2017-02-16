
module app.components {

    import IComponent = app.interfaces.IComponent;
    import getAttributes = app.utils.getAttributes;
    import component = app.decorators.component;
    import Component = app.services.Component;

    @component('card')
    export class CardComponent extends Component {

        /**
         *
         * @returns {string}
         */
        render(): string {

            const {src, href, title} = this.attrs;

            return `
                <div class="card">
                    <div class="card-image">
                        <img src="${src}">
                        <span class="card-title">${title}</span>
                    </div>
                    <div class="card-stacked">
                        <div class="card-content">
                            ${this.originalContent}
                        </div>
                        <div class="card-action">
                            <a href="${href}">Voir annonce</a>
                         </div>
                    </div>
                </div>
            `;
        }
    }

}