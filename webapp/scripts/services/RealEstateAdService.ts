module app.services {

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

    export class RealEstateAdService {

        getAll(): Promise<IAdDetails[]> {

            return fetch("api/serviceannoncesimmobilieres")
                .then(response => response.json())

        }

    }

}