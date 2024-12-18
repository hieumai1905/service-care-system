import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleListComponent } from './schedule-list.component';

describe('ScheduleListComponent', () => {
  let component: ScheduleListComponent;
  let fixture: ComponentFixture<ScheduleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleListComponent]
    });
    fixture = TestBed.createComponent(ScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
