import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponAddComponent } from './coupon-add.component';

describe('CouponAddComponent', () => {
  let component: CouponAddComponent;
  let fixture: ComponentFixture<CouponAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouponAddComponent]
    });
    fixture = TestBed.createComponent(CouponAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
