
module app.utils {


    export function getAttributes(node: JQuery): {[key: string]: string} {

        const attrs = {};

        $.each(node[0].attributes, ( index, attribute ) => {
            attrs[attribute.name] = attribute.value;
        });

        return attrs;
    }
}