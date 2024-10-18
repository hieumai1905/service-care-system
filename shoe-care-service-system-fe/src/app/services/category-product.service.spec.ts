import { TestBed } from '@angular/core/testing';

import { CategoryProductService } from './category-product.service';

describe('CategoryProductService', () => {
  let service: CategoryProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
