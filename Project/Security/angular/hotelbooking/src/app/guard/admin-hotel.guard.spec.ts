import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminHotelGuard } from './admin-hotel.guard';

describe('adminHotelGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminHotelGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
