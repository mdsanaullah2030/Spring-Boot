import { HotelModel } from "./hotel.model";
import { RoomModel } from "./room.model";

export class BookingModel {
  id!: string;
  username!: string;
  checkindate!: Date;
  checkoutdate!: Date;
  totalprice!: number;

  hotel!: HotelModel;
  room!: RoomModel;



}

