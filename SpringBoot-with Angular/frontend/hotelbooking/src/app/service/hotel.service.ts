
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HotelModel } from '../model/hotel.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class HotelService {
  baseUrl: string = "http://localhost:8080/api/hotel/";

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }


  
  // Get Bearer token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    console.log(token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllHotel(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get(this.baseUrl);

  }



  getHotelById(hotelId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<any>(this.baseUrl + hotelId);
  }



  createHotel(hotel: HotelModel, image: File): Observable<HotelModel> {

    const formData = new FormData();

    formData.append('hotel', new Blob([JSON.stringify(hotel)], { type: 'application/json' }));

    // Append image file
    formData.append('image', image);




    const token = this.authService.getToken();
    console.log('Token:', token); // Verify token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      // 'Content-Type' is not needed here
    });

    console.log(headers);

    return this.httpClient.post<HotelModel>(this.baseUrl + "save", formData);

  }



  deleteHotel(id: number) {
    const headers = this.getAuthHeaders();
    return this.httpClient.delete(`${this.baseUrl}delete/${id}`, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }




  updateHotel(id: string, hotel: HotelModel, image?: File): Observable<any> {
    
    const headers = this.getAuthHeaders();
    const formData = new FormData();
    formData.append('hotel', new Blob([JSON.stringify(hotel)], { type: 'application/json' }));


    if (image) {
      formData.append('image', image);
    }

    return this.httpClient.put(this.baseUrl + 'updatehotel/' + id, formData);
  }


  getHotelsByLocation(locationId: string): Observable<HotelModel[]> {
    return this.httpClient.get<HotelModel[]>(this.baseUrl + "getHotelsByLocationId?locationId=" + locationId)
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




























