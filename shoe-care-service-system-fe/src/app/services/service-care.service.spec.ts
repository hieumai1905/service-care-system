import { TestBed } from '@angular/core/testing';

import { ServiceCareService } from './service-care.service';

describe('ServiceCareService', () => {
  let service: ServiceCareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
