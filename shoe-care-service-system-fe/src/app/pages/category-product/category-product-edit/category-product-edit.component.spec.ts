import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProductEditComponent } from './category-product-edit.component';

describe('CategoryProductEditComponent', () => {
  let component: CategoryProductEditComponent;
  let fixture: ComponentFixture<CategoryProductEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryProductEditComponent]
    });
    fixture = TestBed.createComponent(CategoryProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
