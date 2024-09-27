import { HotelModel } from "./hotel.model";

export class RoomModel {


        id!: number;
        roomType!: string;
        image!: string;
        area!: number;
        adultNo!: number;
        childNo!: number;
        price!: number;
        avilability!: boolean;

        hotel: HotelModel = new HotelModel();



}



