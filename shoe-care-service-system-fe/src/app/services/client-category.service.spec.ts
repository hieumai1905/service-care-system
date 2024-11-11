import { TestBed } from '@angular/core/testing';

import { ClientCategoryService } from './client-category.service';

describe('ClientCategoryService', () => {
  let service: ClientCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
