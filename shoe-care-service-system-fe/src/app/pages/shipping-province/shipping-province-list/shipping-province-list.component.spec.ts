import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingProvinceListComponent } from './shipping-province-list.component';

describe('ShippingProvinceListComponent', () => {
  let component: ShippingProvinceListComponent;
  let fixture: ComponentFixture<ShippingProvinceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingProvinceListComponent]
    });
    fixture = TestBed.createComponent(ShippingProvinceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
