import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponItemListComponent } from './coupon-item-list.component';

describe('CouponItemListComponent', () => {
  let component: CouponItemListComponent;
  let fixture: ComponentFixture<CouponItemListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouponItemListComponent]
    });
    fixture = TestBed.createComponent(CouponItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
