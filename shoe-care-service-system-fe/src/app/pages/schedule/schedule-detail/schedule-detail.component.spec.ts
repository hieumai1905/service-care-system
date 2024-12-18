import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleEditComponent } from './schedule-detail.component';

describe('ScheduleEditComponent', () => {
  let component: ScheduleEditComponent;
  let fixture: ComponentFixture<ScheduleEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleEditComponent]
    });
    fixture = TestBed.createComponent(ScheduleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
