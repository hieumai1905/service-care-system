import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCategoryEditComponent } from './client-category-edit.component';

describe('ClientCategoryEditComponent', () => {
  let component: ClientCategoryEditComponent;
  let fixture: ComponentFixture<ClientCategoryEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientCategoryEditComponent]
    });
    fixture = TestBed.createComponent(ClientCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
