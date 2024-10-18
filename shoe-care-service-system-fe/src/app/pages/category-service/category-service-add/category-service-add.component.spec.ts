import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryServiceAddComponent } from './category-service-add.component';

describe('CategoryServiceAddComponent', () => {
  let component: CategoryServiceAddComponent;
  let fixture: ComponentFixture<CategoryServiceAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryServiceAddComponent]
    });
    fixture = TestBed.createComponent(CategoryServiceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
