
declare module app.interfaces {

    interface IComponent {
        onInit?(): void;
        afterRender?(): void;
    }

}