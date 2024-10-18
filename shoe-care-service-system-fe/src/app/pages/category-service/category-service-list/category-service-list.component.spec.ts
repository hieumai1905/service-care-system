import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryServiceListComponent } from './category-service-list.component';

describe('CategoryServiceListComponent', () => {
  let component: CategoryServiceListComponent;
  let fixture: ComponentFixture<CategoryServiceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryServiceListComponent]
    });
    fixture = TestBed.createComponent(CategoryServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
