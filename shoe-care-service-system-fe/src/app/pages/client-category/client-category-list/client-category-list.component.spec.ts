import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCategoryListComponent } from './client-category-list.component';

describe('ClientCategoryListComponent', () => {
  let component: ClientCategoryListComponent;
  let fixture: ComponentFixture<ClientCategoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientCategoryListComponent]
    });
    fixture = TestBed.createComponent(ClientCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
