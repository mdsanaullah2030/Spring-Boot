
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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





}
