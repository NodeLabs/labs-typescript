module app.decorators {

    export function memoize(identity?) {

        return (target, propertyName, descriptor) => {

            const originalMethod = descriptor.value;

            descriptor.value = _.memoize(descriptor.value, identity);

            return descriptor;
        }

    }

}