module app.services {

    import memoize = app.decorators.memoize;

    export interface IAdDetails {
        Id: number;
        Titre: string;
        Ville: string;
        Latitude: number;
        Longitude: number;
        Achat: boolean;
        Location: boolean;
        Appartement: boolean;
        Maison: boolean;
        Chateau: boolean;
        Prix: number;
        NbrPieces: number;
        Surface: number;
        Etage: number;
        Ascenceur: boolean;
        Terrasse: boolean;
        Parking: boolean;
        Descriptif: string;
        ListImagesUrl: string[];
        UrlImagePrincipale: string[];
    }

    export interface IAdRequest {
        Ville: string;
        Achat: boolean;
        Location: boolean;
        Appartement: boolean;
        Maison: boolean;
        Chateau: boolean;
        PrixMin: number;
        PrixMax: number;
        SurfaceMin: number;
        SurfaceMax: number;
    }

    export class RealEstateAdService {

        /**
         *
         * @param options
         * @returns {Promise<TResult>|Promise<T>|PromiseLike<TResult>|Promise<TResult2|TResult1>}
         */
        @memoize(o => o.Ville)
        getAll(options?: IAdRequest): Promise<IAdDetails[]> {

            const parameters = options ? ('?' + this.toParameters(options)) : '';

            return fetch("api/serviceannoncesimmobilieres" + parameters)
                .then(response => response.json())

        }

        /**
         *
         * @param id
         * @returns {Promise<T>|PromiseLike<TResult>|Promise<TResult>|Promise<TResult2|TResult1>}
         */
        getById(id: number): Promise<IAdDetails> {

            return fetch(`api/serviceannoncesimmobilieres/${id}`)
                .then(response => response.json())
        }

        /**
         *
         * @param options
         * @returns {string}
         */
        toParameters(options?: IAdRequest): string {

            return Object.keys(options).map((key) => {

                let value = options[key];

                if (typeof value === "boolean") {
                    value = value ? "True" : "False";
                }

                return `${key}=${value}`;
            }).join('&');

        }
    }

}