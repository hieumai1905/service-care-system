import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddComponent } from './client-add.component';

describe('ClientAddComponent', () => {
  let component: ClientAddComponent;
  let fixture: ComponentFixture<ClientAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAddComponent]
    });
    fixture = TestBed.createComponent(ClientAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
