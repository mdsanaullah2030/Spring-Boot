
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RoomModel } from '../model/room.model';


@Injectable({
  providedIn: 'root'
})
export class RoomService {
  baseUrl:string="http://localhost:8080/api/room/";

  constructor(
    private httpClient: HttpClient
  ) { }


  getAllRooms():Observable<any>{

    return this.httpClient.get(this.baseUrl);

  }

  getRoomByHotel(id:string): Observable<RoomModel[]> {

    return this.httpClient.get<RoomModel[]>(this.baseUrl+"r/searchroombyid?hotelid="+id)
      .pipe(
        catchError(this.handleError)
    )

  }


  private handleError(error:any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('test'));
  }


  createRoom(room: RoomModel, image: File): Observable<RoomModel> {

    const formData = new FormData();

    formData.append('room', new Blob([JSON.stringify(room)], { type: 'application/json' }));

    // Append image file
    formData.append('image', image);

    return this.httpClient.post<RoomModel>(this.baseUrl + "save", formData);

  }

  deleteRoom(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "/" + id);
    
  }

  updateRoom(id: string, room: RoomModel): Observable<any> {

    return this.httpClient.put(this.baseUrl + "/" + id, room);

  }

  getById(id: string): Observable<any> {

    return this.httpClient.get(this.baseUrl + "/" + id);

  }

}


