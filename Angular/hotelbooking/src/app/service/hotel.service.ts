
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelModel } from '../model/hotel.model';


@Injectable({
  providedIn: 'root'
})
export class HotelService {
  baseUrl: string = "http://localhost:8080/api/hotel/";

  constructor(
    private httpClient: HttpClient
  ) { }


  getAllHotel(): Observable<any> {

    return this.httpClient.get(this.baseUrl);

  }

  getHotelById(hotelId: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + hotelId);
  }

  createHotel(hotel: HotelModel, image: File): Observable<HotelModel> {

    const formData = new FormData();

    formData.append('hotel', new Blob([JSON.stringify(hotel)], { type: 'application/json' }));

    // Append image file
    formData.append('image', image);

    return this.httpClient.post<HotelModel>(this.baseUrl + "save", formData);

  }



  }











 


 