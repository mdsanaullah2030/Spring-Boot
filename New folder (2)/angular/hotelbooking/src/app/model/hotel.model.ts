export class HotelModel {
    id!: number;
    name!: string;
    image!: string;
    address!:string;
    maxPrice!:number;
    minPrice!:number;
    rating!: string;

    location!:{

        id: number;
        name: string;
        image: string;
    };
}
