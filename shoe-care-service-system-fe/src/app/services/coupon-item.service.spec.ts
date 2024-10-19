import { TestBed } from '@angular/core/testing';

import { CouponItemService } from './coupon-item.service';

describe('CouponItemService', () => {
  let service: CouponItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouponItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
