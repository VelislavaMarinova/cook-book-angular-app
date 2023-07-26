import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCategoryItemComponent } from './recipe-category-item.component';

describe('RecipeCategoryItemComponent', () => {
  let component: RecipeCategoryItemComponent;
  let fixture: ComponentFixture<RecipeCategoryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeCategoryItemComponent]
    });
    fixture = TestBed.createComponent(RecipeCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
