import { Component,} from '@angular/core';
import { LocationModel } from '../../model/location.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationService } from '../../service/location.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-createlocation',
  templateUrl: './createlocation.component.html',
  styleUrl: './createlocation.component.css'
})
export class CreatelocationComponent {
  image: File | null = null;
  location: LocationModel = new LocationModel();
  formGroup!:FormGroup;

  constructor(
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private router:Router,
   
  ) { }

  ngOnInit(): void {



   this.formGroup = this.formBuilder.group({
      name: ['']
    
    });


  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }


  onSubmit() {
    if (this.image) {

      const location: LocationModel = {
        ...this.formGroup.value,
        
      };
  
      this.locationService.createLocation(location, this.image).subscribe({
        next: res => {
          console.log('Location added successfully', res);
          this.router.navigate(['/location']);
          console.log('Response:', res);
        },
        error: err => {
          console.error('Error adding location:', err);
        }
      });
    } else {
      alert('Please select an image.');
    }
  }
}
