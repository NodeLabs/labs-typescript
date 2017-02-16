module app.services {

    export interface IAdd {
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

        getAll(): Promise<IAdd[]> {

            return fetch("api/serviceannoncesimmobilieres")
                .then(response => response.json())

        }

    }

}