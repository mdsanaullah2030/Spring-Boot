
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LocationModel } from '../model/location.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class LocationService {


  baseUrl: string = "http://localhost:8080/api/location/"



  private checkinDate: string = '';
  private checkoutDate: string = '';



  constructor(private httpClient: HttpClient,
    private authService: AuthService, 
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

 

  

  setCheckinDate(date: string): void {
    this.checkinDate = date;
  }

  setCheckoutDate(date: string): void {
    this.checkoutDate = date;
  }

  getCheckinDate(): string {
    return this.checkinDate;
  }

  getCheckoutDate(): string {
    return this.checkoutDate;
  }






  getAllLocation(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get(this.baseUrl)
  }

  getLocationById(locationId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<any>(this.baseUrl + locationId);
  }

  createLocation(location: LocationModel, image: File): Observable<LocationModel> {

    const formData = new FormData();

    formData.append('location', new Blob([JSON.stringify(location)], { type: 'application/json' }));

    // Append image file
    formData.append('image', image);

    const token = this.authService.getToken();
    console.log('Token:', token); // Verify token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      // 'Content-Type' is not needed here
    });

    console.log(headers);
    return this.httpClient.post<LocationModel>(this.baseUrl + "save", formData);

  }


  updateLocation(id: string, location: LocationModel, image?: File): Observable<any> {
    const headers = this.getAuthHeaders();
    const formData = new FormData();


    formData.append('location', new Blob([JSON.stringify(location)], { type: 'application/json' }));


    if (image) {
      formData.append('image', image);
    }

    return this.httpClient.put(this.baseUrl + 'update/' + id, formData);
  }


  deleteLocation(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.delete(this.baseUrl + 'delete/' + id);
  }


  getAllLocationforHotel(): Observable<LocationModel[]> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<LocationModel[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      )

  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('test'));
  }





  findLocationName(locationName: string): Observable<LocationModel[]> {
    const params = new HttpParams().set('locationName', locationName);
    // Correctly append the endpoint to baseUrl
    return this.httpClient.get<LocationModel[]>(`${this.baseUrl}findLocationName`, { params });
  }


}