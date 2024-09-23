import { AuthService } from "../service/auth.service";


export class SomeComponent {
    constructor(private authService: AuthService) {}
  
    get isAdmin(): boolean {
      return this.authService.isAdmin();
    }
  
    get isUser(): boolean {
      return this.authService.isUser();
    }
  
    get isHotel(): boolean {
      return this.authService.isHotel();
    }
  }