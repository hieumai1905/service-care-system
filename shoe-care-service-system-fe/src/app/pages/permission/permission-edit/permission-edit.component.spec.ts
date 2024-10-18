import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionEditComponent } from './permission-edit.component';

describe('PermissionEditComponent', () => {
  let component: PermissionEditComponent;
  let fixture: ComponentFixture<PermissionEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermissionEditComponent]
    });
    fixture = TestBed.createComponent(PermissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
