
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

// Get all hotels
getAllHotelforRoom(): Observable<any> {

    const headers = this.getAuthHeaders();
    return this.httpClient.get(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      );

  }
// Get a hotel by ID
  getHotelById(hotelId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<any>(`${this.baseUrl}${hotelId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

   // Create a new hotel with an image
   createHotel(hotel: HotelModel, image: File): Observable<HotelModel> {
    const formData = new FormData();
    formData.append('hotel', new Blob([JSON.stringify(hotel)], { type: 'application/json' }));
    formData.append('image', image);

    const token = this.authService.getToken();
    console.log('Token:', token); // Verify token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      // 'Content-Type' is not needed here
    });

    console.log(headers);
    return this.httpClient.post<HotelModel>(`${this.baseUrl}save`, formData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }



  // Delete a hotel by ID
  deleteHotel(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.delete(`${this.baseUrl}${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }



 // Update a hotel by ID
 updateHotel(id: string, hotel: HotelModel): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.httpClient.put(`${this.baseUrl}${id}`, hotel, { headers })
    .pipe(
      catchError(this.handleError)
    );
}

 

 // Get hotel by ID (alternative method to getHotelById)
 getById(id: string): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.httpClient.get(`${this.baseUrl}${id}`, { headers })
    .pipe(
      catchError(this.handleError)
    );
}

 // Common error handler
 private handleError(error: any) {
  console.error('An error occurred:', error);
  return throwError(() => new Error(error.message || 'Server Error'));
}

}














