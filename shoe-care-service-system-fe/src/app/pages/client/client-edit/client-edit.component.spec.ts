import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditComponent } from './client-edit.component';

describe('ClientEditComponent', () => {
  let component: ClientEditComponent;
  let fixture: ComponentFixture<ClientEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientEditComponent]
    });
    fixture = TestBed.createComponent(ClientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
