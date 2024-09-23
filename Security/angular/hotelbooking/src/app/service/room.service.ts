
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RoomModel } from '../model/room.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoomService {
  baseUrl: string = "http://localhost:8080/api/room/";

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

  getRoomByHotel(hotelId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get(`${this.baseUrl}hotel/${hotelId}`, { headers }) // Assuming your API endpoint takes hotelId
      .pipe(
        catchError(this.handleError)
      );
  }
  
  // Get a hotel by ID
  getRoomById(roomId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<any>(`${this.baseUrl}${roomId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }




  createRoom(room: RoomModel, image: File): Observable<RoomModel> {

    const formData = new FormData();
    formData.append('room', new Blob([JSON.stringify(room)], { type: 'application/json' }));
    formData.append('image', image);

    const token = this.authService.getToken();
    console.log('Token:', token); // Verify token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      // 'Content-Type' is not needed here
    });
    console.log(headers);
    return this.httpClient.post<RoomModel>(`${this.baseUrl}save`, formData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }




  updateRoom(id: string, room: RoomModel): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.put(`${this.baseUrl}${id}`, room, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // getById(id: string): Observable<any> {

  //   return this.httpClient.get(this.baseUrl + id);

  // }

  deleteRoom(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.delete(`${this.baseUrl}${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get(`${this.baseUrl}${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('test'));
  }

}



