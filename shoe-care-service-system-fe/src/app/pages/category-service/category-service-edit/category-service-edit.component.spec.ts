import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryServiceEditComponent } from './category-service-edit.component';

describe('CategoryServiceEditComponent', () => {
  let component: CategoryServiceEditComponent;
  let fixture: ComponentFixture<CategoryServiceEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryServiceEditComponent]
    });
    fixture = TestBed.createComponent(CategoryServiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
