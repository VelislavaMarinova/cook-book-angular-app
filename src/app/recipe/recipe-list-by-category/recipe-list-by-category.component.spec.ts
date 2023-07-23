import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListByCategoryComponent } from './recipe-list-by-category.component';

describe('RecipeListByCategoryComponent', () => {
  let component: RecipeListByCategoryComponent;
  let fixture: ComponentFixture<RecipeListByCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeListByCategoryComponent]
    });
    fixture = TestBed.createComponent(RecipeListByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
