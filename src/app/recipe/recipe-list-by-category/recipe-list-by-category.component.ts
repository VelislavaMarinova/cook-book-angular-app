import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';
import { ApiResponse } from 'src/app/types/response';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-recipe-list-by-category',
  templateUrl: './recipe-list-by-category.component.html',
  styleUrls: ['./recipe-list-by-category.component.css']
})


export class RecipeListByCategoryComponent implements OnInit {
  recipes: Recipe[] = []
  isLoading: boolean = true;
  noRecipesInTheList: boolean = false;
  category: string | undefined;

  numRecipesPerPage: number = 6;
  numLoadedRecipes: number = 0;
  loadMore: boolean = true;
  recipesToLoad: Recipe[] = [];
  private page = 1;
  private perPage = 6
  totalCount: number = 0
  loadMoreClickCounter = 0
  previousCat: string | undefined
  totalPages: number = 0



  constructor(

    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadItems()
  }
  loadItems() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.category = params['category'];


      if (this.category !== this.previousCat) {

        this.recipes = []
        this.page = 1

        this.previousCat = this.category
      }

      this.isLoading = true;
      this.noRecipesInTheList = false;
      this.loadMore = true;

      this.apiService.getByCategorySortedByDateWithPagination(
        this.category!,
        this.page,
        this.perPage
      ).subscribe((res) => {


        this.recipes = [...res.items];
        this.totalCount = res.totalCount;
        this.totalPages = res.totalPages;
        if (this.totalPages === this.page) {
          this.loadMore = false
        }
      
        if (this.recipes.length === 0) {
          this.noRecipesInTheList = true;
        }
        this.isLoading = false

      })

    }
    )
  }
  onLoadMore() {
    if (this.loadMore) {

      this.page++;
      this.loadMore = this.page < this.totalPages;

      this.loadMoreItems()
    }
  }
  loadMoreItems() {
    this.apiService.getByCategorySortedByDateWithPagination(this.category!,
      this.page,
      this.perPage).subscribe(res => {
        this.recipes = [...this.recipes, ...res.items]

      })
  }
}
