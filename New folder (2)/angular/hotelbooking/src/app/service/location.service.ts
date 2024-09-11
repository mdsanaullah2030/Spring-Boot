
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LocationModel } from '../model/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  baseUrl: string = "http://localhost:8080/api/location/"

  constructor(private httpClient: HttpClient) { }


  getAllLocation(): Observable<any> {
    return this.httpClient.get(this.baseUrl)
  }

  getLocationById(locationId: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + locationId);
  }

  createLocation(location: LocationModel, image: File): Observable<LocationModel> {

    const formData = new FormData();

    formData.append('location', new Blob([JSON.stringify(location)], { type: 'application/json' }));

    // Append image file
    formData.append('image', image);

    return this.httpClient.post<LocationModel>(this.baseUrl + "save", formData);

  }
  
 
  deleteLocation(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
  updateLocation(id: string, location: LocationModel, image?: File): Observable<any> {
    const formData = new FormData();

   
    formData.append('location', new Blob([JSON.stringify(location)], { type: 'application/json' }));


    if (image) {
        formData.append('image', image);
    }

    return this.httpClient.put(this.baseUrl + 'update/' + id, formData);
}



getAllLocationforHotel():Observable<LocationModel[]>{
  return this.httpClient.get<LocationModel[]>(this.baseUrl)
    .pipe(
      catchError(this.handleError)
    )

}

private handleError(error: any) {
  console.error('An error occurred:', error);
  return throwError(() => new Error('test'));
}

}