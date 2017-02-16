
declare module app.interfaces {

    interface IComponent {
        render(): string;
        afterRender?(): void;
        element: JQuery;
    }

}