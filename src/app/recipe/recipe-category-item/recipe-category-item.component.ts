import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/types/category';

@Component({
  selector: 'app-recipe-category-item',
  templateUrl: './recipe-category-item.component.html',
  styleUrls: ['./recipe-category-item.component.css']
})
export class RecipeCategoryItemComponent implements OnInit {
  @Input() category: Category | undefined

  ngOnInit(): void {
    console.log('RecipeCategoryItemComponent',this.category);
    
  }

}
