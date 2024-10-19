import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeListComponent } from './size-list.component';

describe('SizeListComponent', () => {
  let component: SizeListComponent;
  let fixture: ComponentFixture<SizeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SizeListComponent]
    });
    fixture = TestBed.createComponent(SizeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
