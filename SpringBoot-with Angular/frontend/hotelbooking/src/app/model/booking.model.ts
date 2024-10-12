import { HotelModel } from "./hotel.model";
import { RoomModel } from "./room.model";
import { User } from "./user.model";

export class BookingModel {
  id!: string;

  checkindate!: Date;
  checkoutdate!: Date;
 totalprice!: number;

  hotel!: HotelModel;
  room!: RoomModel;
 user!:User;


}

