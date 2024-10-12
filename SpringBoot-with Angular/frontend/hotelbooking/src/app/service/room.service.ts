
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RoomModel } from '../model/room.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoomService {
  baseUrl:string="http://localhost:8080/api/room/";

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



  getAllRooms():Observable<any>{
    const headers = this.getAuthHeaders();
    return this.httpClient.get(this.baseUrl);

  }

  


  createRoom(room: RoomModel, image: File): Observable<RoomModel> {

    const formData = new FormData();

    formData.append('room', new Blob([JSON.stringify(room)], { type: 'application/json' }));

    // Append image file
    formData.append('image', image);

    const token = this.authService.getToken();
    console.log('Token:', token); // Verify token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      // 'Content-Type' is not needed here
    });
    console.log(headers);
    return this.httpClient.post<RoomModel>(this.baseUrl + "save", formData);

  }




  
  updateRoom(id: string, room: RoomModel, image?: File): Observable<any> {
    const headers = this.getAuthHeaders();
    const formData = new FormData();

   
    formData.append('room', new Blob([JSON.stringify(room)], { type: 'application/json' }));


    if (image) {
        formData.append('image', image);
    }

    return this.httpClient.put(this.baseUrl + 'updateroom/' + id, formData);
}

  getById(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get(this.baseUrl + id);

  }

  deleteRoom(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.delete(this.baseUrl + id);
    
  }


  
  getRoomByHotel(id:string): Observable<RoomModel[]> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<RoomModel[]>(this.baseUrl+"r/searchroombyid?hotelid="+id)
      .pipe(
        catchError(this.handleError)
    )

  }

  getRoomByHotels(hotelId: number): Observable<RoomModel[]> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<RoomModel[]>(`${this.baseUrl}/rooms?hotelId=${hotelId}`);
  }
  


  getRoomById(roomId: number): Observable<RoomModel> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<RoomModel>(`${this.baseUrl}${roomId}`);
  }

  private handleError(error:any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('test'));
  }

}



