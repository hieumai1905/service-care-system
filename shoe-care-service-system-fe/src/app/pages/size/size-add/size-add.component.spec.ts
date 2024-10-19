import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeAddComponent } from './size-add.component';

describe('SizeAddComponent', () => {
  let component: SizeAddComponent;
  let fixture: ComponentFixture<SizeAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SizeAddComponent]
    });
    fixture = TestBed.createComponent(SizeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
