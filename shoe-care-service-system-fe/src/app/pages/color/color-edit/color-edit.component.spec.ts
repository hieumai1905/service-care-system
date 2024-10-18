import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorEditComponent } from './color-edit.component';

describe('ColorEditComponent', () => {
  let component: ColorEditComponent;
  let fixture: ComponentFixture<ColorEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorEditComponent]
    });
    fixture = TestBed.createComponent(ColorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
