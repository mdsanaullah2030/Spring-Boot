import { Component } from '@angular/core';
import { AuthResponse } from '../../model/AuthResponse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      cell: [''],
      address: [''],
      dob: [''],
      role: ['', Validators.required],
      gender: [''],
      image: ['']
    }
    ,{ validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const { name, email, password, cell, address, dob, gender, image,role } = this.registerForm.value;

    let registerObservable;
    console.log(role)
    if (role === 'ADMIN') {
      console.log(role)
      registerObservable = this.authService.registerAdmin({ name, email, password, cell, address, dob, gender, image ,role});
    } else {
      registerObservable = this.authService.register({ name, email, password, cell, address, dob, gender, image ,role});
    }

    registerObservable.subscribe(
   {

    next: AuthResponse => {
      this.successMessage = 'Registration successful! Please check your email to activate your account.';
      this.router.navigate(['/login']);
    },
    error:error => {
      this.errorMessage = 'Registration failed. Please try again.';
    }

   }
    );
  }

}
