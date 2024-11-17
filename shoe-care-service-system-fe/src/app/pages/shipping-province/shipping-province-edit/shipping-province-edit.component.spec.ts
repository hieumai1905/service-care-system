import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingProvinceEditComponent } from './shipping-province-edit.component';

describe('ShippingProvinceEditComponent', () => {
  let component: ShippingProvinceEditComponent;
  let fixture: ComponentFixture<ShippingProvinceEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingProvinceEditComponent]
    });
    fixture = TestBed.createComponent(ShippingProvinceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
