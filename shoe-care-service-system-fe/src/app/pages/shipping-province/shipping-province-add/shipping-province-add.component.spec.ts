import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingProvinceAddComponent } from './shipping-province-add.component';

describe('ShippingProvinceAddComponent', () => {
  let component: ShippingProvinceAddComponent;
  let fixture: ComponentFixture<ShippingProvinceAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingProvinceAddComponent]
    });
    fixture = TestBed.createComponent(ShippingProvinceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
