import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAddComponent } from './service-add.component';

describe('ServiceAddComponent', () => {
  let component: ServiceAddComponent;
  let fixture: ComponentFixture<ServiceAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceAddComponent]
    });
    fixture = TestBed.createComponent(ServiceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
