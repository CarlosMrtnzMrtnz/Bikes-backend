import { TestBed } from '@angular/core/testing';

import { BikesServices } from './bikes-services';

describe('BikesServices', () => {
  let service: BikesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BikesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
