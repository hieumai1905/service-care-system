import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProductAddComponent } from './category-product-add.component';

describe('CategoryProductAddComponent', () => {
  let component: CategoryProductAddComponent;
  let fixture: ComponentFixture<CategoryProductAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryProductAddComponent]
    });
    fixture = TestBed.createComponent(CategoryProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
