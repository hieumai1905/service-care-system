import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReportComponent } from './client-report.component';

describe('ClientReportComponent', () => {
  let component: ClientReportComponent;
  let fixture: ComponentFixture<ClientReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientReportComponent]
    });
    fixture = TestBed.createComponent(ClientReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
