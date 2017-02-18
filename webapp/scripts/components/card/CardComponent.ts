
module app.components {

    import getAttributes = app.utils.getAttributes;

    export class CardComponent {

        static selectorName: string = "card";

        private _element;
        private _content: string;

        /**
         *
         * @param selector
         * @param options
         */
        private constructor(selector: string | JQuery | Element = CardComponent.selectorName) {
            this._element = jQuery(selector);
            this._content = this.element.html();

            this.element.html(this.render());
        }

        /**
         *
         * @returns {string}
         */
        render(): string {

            const {src, href, title} = getAttributes(this.element);

            return `
                <div class="card">
                    <div class="card-image">
                        <img src="${src}">
                        <span class="card-title">${title}</span>
                    </div>
                    <div class="card-stacked">
                        <div class="card-content">
                            ${this._content}
                        </div>
                        <div class="card-action">
                            <a href="${href}">Voir annonce</a>
                         </div>
                    </div>
                </div>
            `;
        }

        get element(): JQuery {
            return this._element;
        }

        /**
         *
         * @param selector
         */
        static fromSelector(selector: string = CardComponent.selectorName) {

            const elements = jQuery(selector);

            elements.each((index, element: Element) => {
                new CardComponent(element);
            });

        }
    }

}