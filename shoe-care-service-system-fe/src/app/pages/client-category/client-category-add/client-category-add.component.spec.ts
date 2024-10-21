import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCategoryAddComponent } from './client-category-add.component';

describe('ClientCategoryAddComponent', () => {
  let component: ClientCategoryAddComponent;
  let fixture: ComponentFixture<ClientCategoryAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientCategoryAddComponent]
    });
    fixture = TestBed.createComponent(ClientCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
