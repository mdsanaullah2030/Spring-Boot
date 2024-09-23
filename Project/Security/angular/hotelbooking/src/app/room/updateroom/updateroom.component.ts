import { Component, OnInit,  } from '@angular/core';
import { RoomModel } from '../../model/room.model';
import { HotelModel } from '../../model/hotel.model';
import { HotelService } from '../../service/hotel.service';
import { RoomService } from '../../service/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-updateroom',
  templateUrl: './updateroom.component.html',
  styleUrl: './updateroom.component.css'
})
export class UpdateroomComponent implements OnInit {
  rooms: RoomModel = new RoomModel();
  hotel: HotelModel []= [];
  selectedImage?: File;
  id: string = '';

  constructor(
    private hotelService: HotelService,
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; 
    this.roomService.getById(this.id).subscribe({
      next: (res) => {
        this.rooms = res;
        console.log(this.rooms);
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.loadHotel();
  }

  loadHotel(): void {
    this.hotelService.getAllHotelforRoom().subscribe({
      next: (res: HotelModel[]) => {
        this.hotel = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  updateRoom(): void {
    this.roomService.updateRoom(this.id, this.rooms, this.selectedImage).subscribe({
      next: () => {
        this.router.navigate(['/room']); 
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}