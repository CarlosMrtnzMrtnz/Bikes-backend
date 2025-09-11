import { TestBed } from '@angular/core/testing';

import { StationServices } from './station-services';

describe('StationServices', () => {
  let service: StationServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
