module app.services {

    /**
     *
     */
    export class ComponentsFactory {
        private static components = new Map<string | any, any | string>();

        static boostrap(cmpClazz: any) {

            jQuery(document).ready(() => {
                this.render(cmpClazz);
            });

        }

        /**
         * Render the component and his childrens.
         * @param cmpClazz
         */
        static render(cmpClazz: any) {

            const selector: string = this.components.get(cmpClazz) as string;

            this.fromSelector(selector, cmpClazz)
                .forEach(cmp => cmp.render());

        }
        /**
         * Add a new components in registry.
         */
        static add(selector: string, target: any, childrens: any[] = []) {

            target.$childrens = childrens;

            this.components.set(selector, target);
            this.components.set(target, selector);
        }

        /**
         * Bind component from his selector.
         * @param selector
         * @param componentClazz
         * @returns {Array}
         */
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