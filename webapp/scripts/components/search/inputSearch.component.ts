
module app.components {

    import Component = app.services.Component;
    import component = app.decorators.component;

    @component("input-search")
    export class InputSearchComponent extends Component {

        private oldValue;

        render() {

            return `
                <form>
                    <div class="input-field">
                        <input type="search" value="${this.attrs.value}" required>
                        <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                        <i class="material-icons">close</i>
                    </div>
                </form>
            `;
        }

        afterRender() {
            const input = this.element.find('input');
            this.oldValue = input.val();

            input.on("keyup", () => {

                const currentValue = input.val();

                if (this.oldValue !== currentValue) {
                    setTimeout(() => {

                        if (currentValue === input.val()) {
                            this.oldValue = input.val();
                            this.element.trigger('changeValue', input.val());
                        }

                    }, 400);
                }

            });
        }

    }
}