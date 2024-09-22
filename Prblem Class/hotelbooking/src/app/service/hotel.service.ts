
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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



  deleteHotel(id: number) {
    return this.httpClient.delete(`${this.baseUrl}delete/${id}`, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }




  updateHotel(id: string, hotel: HotelModel, image?: File): Observable<any> {
    const formData = new FormData();


    formData.append('hotel', new Blob([JSON.stringify(hotel)], { type: 'application/json' }));


    if (image) {
      formData.append('image', image);
    }

    return this.httpClient.put(this.baseUrl + 'updatehotel/' + id, formData);
  }


  getHotelsByLocation(locationId: string): Observable<HotelModel[]> {
    return this.httpClient.get<HotelModel[]>(this.baseUrl + "h/searchhotelid?locationid=" + locationId)
      .pipe(catchError(this.handleError));
  }
  

  
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('test'));
  }



  getAllHotelforRoom(): Observable<HotelModel[]> {
    return this.httpClient.get<HotelModel[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      )

  }
}














