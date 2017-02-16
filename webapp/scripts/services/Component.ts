module app.services {
    import getAttributes = app.utils.getAttributes;

    export abstract class Component {

        protected _element;
        protected _content;

        constructor(selector: string | JQuery | Element = "") {
            this._element = jQuery(selector);
            this._content = this.element.html();
        }

        get element(): JQuery {
            return this._element;
        }

        /**
         *
         * @returns {{[p: string]: string}}
         */
        get attrs(): any {
            return getAttributes(this.element);
        }

        /**
         *
         * @returns {any}
         */
        get originalContent(): string {
            return this._content;
        }

        abstract render();
    }
}