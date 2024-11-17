import { TestBed } from '@angular/core/testing';

import { ShippingProvinceService } from './shipping-province.service';

describe('ShippingProvinceService', () => {
  let service: ShippingProvinceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingProvinceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
