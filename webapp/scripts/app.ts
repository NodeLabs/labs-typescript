
module app {
    class AppComponent {

        private element: JQuery;

        constructor(selector: string) {


            this.element = jQuery(selector);
            this.element.html(this.render());

        }

        private render(): string {
            return `HELLO WORLD`;
        }
    }

    new AppComponent("app");
}
