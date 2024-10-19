import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponEditComponent } from './coupon-edit.component';

describe('CouponEditComponent', () => {
  let component: CouponEditComponent;
  let fixture: ComponentFixture<CouponEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouponEditComponent]
    });
    fixture = TestBed.createComponent(CouponEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
