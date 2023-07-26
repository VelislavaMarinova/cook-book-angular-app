import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCategoriesComponent } from './recipe-categories.component';

describe('RecipeCategoriesComponent', () => {
  let component: RecipeCategoriesComponent;
  let fixture: ComponentFixture<RecipeCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeCategoriesComponent]
    });
    fixture = TestBed.createComponent(RecipeCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
