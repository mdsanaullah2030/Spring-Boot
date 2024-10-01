import { Component } from '@angular/core';
import { RoomModel } from '../../model/room.model';
import { BookingModel } from '../../model/booking.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelModel } from '../../model/hotel.model';
import { BookingService } from '../../service/booking.service';

import { RoomService } from '../../service/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../service/location.service';
import { jsPDF } from 'jspdf'; 

import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { AuthService } from '../../service/auth.service';
import { User } from '../../model/user.model';



@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrl: './createbooking.component.css'
})
export class CreatebookingComponent {
  bookingForm: FormGroup;
  roomM: RoomModel = new RoomModel();
  name: string = '';
  roomId?: number;
  user:User[]=[];

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private authService: AuthService
  ) {
    this.bookingForm = this.fb.group({

    
      user: ['', Validators.required] ,

      hotel: ['', Validators.required],
      room: ['', Validators.required],
      totalprice: ['']
    });
  }

  ngOnInit() {
    const roomId = this.route.snapshot.params['roomId'];
    this.roomService.getById(roomId).subscribe((data) => {
      this.roomM = data;

      // Log the roomM object to verify it includes price
      console.log('Room data:', this.roomM);

      this.bookingForm.patchValue({
        hotel: this.roomM.hotel,
        room: this.roomM
      });

      // Ensure price exists
      if (this.roomM.price) {
        this.calculatePrice();
      } else {
        console.error('Room price is missing');
      }
    });



     // Get the logged-in user's name and set it in the booking form
     const user = this.authService.getCurrentUser(); // Assuming this method gets the logged-in user's details
     console.log(user);
     if (user) {
       this.name = user.name;
       this.bookingForm.patchValue({ user: this.name });
     }




  }

  calculatePrice() {
    // Get check-in and check-out dates from the service
    const checkinDateStr = this.locationService.getCheckinDate();
    const checkoutDateStr = this.locationService.getCheckoutDate();

    // Ensure dates are not empty
    if (checkinDateStr && checkoutDateStr) {
      // Convert date strings to Date objects
      const checkinDate = new Date(checkinDateStr);
      const checkoutDate = new Date(checkoutDateStr);

      // Ensure that the check-out date is after the check-in date
      if (checkoutDate > checkinDate) {
        const timeDifference = checkoutDate.getTime() - checkinDate.getTime();
        const days = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days

        // Calculate total price
        const totalPrice = days * this.roomM.price;

        console.log(this.roomM.price + " room  price")
        console.log(totalPrice + " Total Price")


        // Update the total price in the booking form
        this.bookingForm.patchValue({ totalprice: totalPrice });
      } else {
        // Invalid date range, reset the total price
        alert('Check-out date must be after check-in date.');
        this.bookingForm.patchValue({ totalprice: 'totalprice' });
      }
    } else {
      // One or both dates are missing, reset the total price
      this.bookingForm.patchValue({ totalprice: '' });
    }
  }


  onSubmit() {
    if (this.bookingForm.valid) {
      const bookingData = this.bookingForm.value;
  
      bookingData.checkindate = this.locationService.getCheckinDate();
      bookingData.checkoutdate = this.locationService.getCheckoutDate();


      console.log(bookingData);
      this.bookingService.createBoking(bookingData).subscribe(
        (response) => {
          console.log('Booking saved successfully!', response);
          this.router.navigate(['/booking']);
        },
        (error) => {
          console.error('Error saving booking', error);
        }
      );
    }
  }




  generatePDF() {
    const doc = new jsPDF();
    
    // Title of the document
    doc.setFontSize(16);
    doc.text('Booking Details', 10, 10);
    
    // Define table columns and data
    const columns = [
        { header: 'Detail', dataKey: 'detail' },
        { header: 'Value', dataKey: 'value' }
    ];

    // Extract the values from the booking form
    const hotel = this.bookingForm.get('hotel')?.value || 'N/A';
    const room = this.bookingForm.get('room')?.value || 'N/A';
    const user = this.bookingForm.get('user')?.value || 'N/A';
    
 
    
    const checkinDate = this.locationService.getCheckinDate() || 'N/A';
    const checkoutDate = this.locationService.getCheckoutDate() || 'N/A';
    const totalPrice = this.bookingForm.get('totalprice')?.value || '0';

    // Create the data array with proper room type handling
    const data = [
        { detail: 'User', value: typeof user === 'object' ? user.name : user },
        { detail: 'Hotel', value: typeof hotel === 'object' ? hotel.name : hotel },
        { detail: 'Room Type', value:typeof room=== 'object'?room.roomType:room}, // Room type is correctly extracted here
        { detail: 'Check-in Date', value: checkinDate },
        { detail: 'Check-out Date', value: checkoutDate },
        { detail: 'Total Price', value: totalPrice }
    ];

    // Generate the table using autoTable
    autoTable(doc, {
        head: [columns.map(col => col.header)], // Set headers
        body: data.map(item => [item.detail, item.value]), // Set data rows
        styles: {
            fontSize: 12,
            cellPadding: 2,
            overflow: 'linebreak',
        },
        headStyles: {
            fillColor: [22, 160, 133], // Set header background color
            textColor: [255, 255, 255], // Set header text color
            fontSize: 14,
        },
        didDrawCell: (data) => {
            // Custom drawing code can go here (if needed)
        }
    });
  
    // Save the PDF with a meaningful filename
    doc.save(`booking-details-${typeof hotel === 'object' ? hotel.name : hotel}.pdf`);
}

  
  
}