import { TestBed } from '@angular/core/testing';

import { RentServices } from './rent-services';

describe('RentServices', () => {
  let service: RentServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
