module app.decorators {
    import ComponentsFactory = app.services.ComponentsFactory;
    /**
     * Decorator
     * @param selector
     * @param cmps
     * @returns {(target:any)}
     */
    export function component(selector: string, ...cmps: any[]) {

        return (target: any) => {

            ComponentsFactory.add(selector, target, cmps);

        }
    }
}