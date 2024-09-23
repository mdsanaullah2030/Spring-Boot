
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LocationModel } from '../model/location.model';
import { response } from 'express';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  baseUrl: string = "http://localhost:8080/api/location/"

  constructor(private httpClient: HttpClient,
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

  getAllLocationforHotel(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      );
  }


  getLocationById(locationId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<any>(`${this.baseUrl}${locationId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  createLocation(location: LocationModel, image: File): Observable<LocationModel> {

    const formData = new FormData();
    formData.append('location', new Blob([JSON.stringify(location)], { type: 'application/json' }));
    formData.append('image', image);

    const token = this.authService.getToken();
    console.log('Token:', token); // Verify token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      // 'Content-Type' is not needed here
    });

    console.log(headers);
    return this.httpClient.post<LocationModel>(`${this.baseUrl}save`, formData, { headers })
      .pipe(
        catchError(this.handleError)
      );

  }
  

  updateLocation(id: string, location: LocationModel): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.put(`${this.baseUrl}${id}`, location, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }


deleteLocation(id: string): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.httpClient.delete(`${this.baseUrl}${id}`, { headers })
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





findLocationName(locationName: string): Observable<LocationModel[]> {
  const params = new HttpParams().set('locationName', locationName);
  // Correctly append the endpoint to baseUrl
  return this.httpClient.get<LocationModel[]>(`${this.baseUrl}findLocationName`, { params });
}
}