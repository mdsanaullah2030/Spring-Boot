
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BookingModel } from '../model/booking.model';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  baseUrl:string="http://localhost:8080/api/booking/";

  constructor(private http: HttpClient) {}

  viewAllBooking(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  

  createBoking(booking: BookingModel): Observable<BookingModel> {
  
    return this.http.post<BookingModel>(this.baseUrl + "save", booking, {
      headers: { 'Content-Type': 'application/json' }
    });
  
  }
  

  private handleError(error:any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('test'));
  }


}