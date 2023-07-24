import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Category } from 'src/app/types/category';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe-categories',
  templateUrl: './recipe-categories.component.html',
  styleUrls: ['./recipe-categories.component.css']
})
export class RecipeCategoriesComponent implements OnInit {
  categoriesList: Category[] = [];
  isLoading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.onGetCategories()
  }

  onGetCategories() {
    this.apiService.getCategories().subscribe(
      {
        next: (categories) => {

          this.categoriesList = categories;

          this.isLoading = false
          console.log('from categories', this.categoriesList)

        },
        error: (err) => {
          this.isLoading = false
          console.log(`Error ${err}`);
        }
      }
    );
  }

// improved
// categoriesList: any[] = [];
//   isLoading: boolean = true;
//   private destroy$: Subject<void> = new Subject<void>();

//   constructor(private apiService: ApiService) {}

//   ngOnInit(): void {
//     this.fetchCategories();
//   }

//   private fetchCategories(): void {
//     this.apiService.getCategories()
//       .pipe(
//         takeUntil(this.destroy$),
//         catchError((err) => {
//           console.log(`Error fetching categories: ${err}`);
//           // Handle error gracefully, e.g., show error message to the user
//           return [];
//         })
//       )
//       .subscribe({
//         next: (categories) => {
//           this.categoriesList = categories;
//           this.isLoading = false;
//           console.log('Categories', this.categoriesList);
//         }
//       });
//   }

//   ngOnDestroy(): void {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }

  // recipeList: Recipe[] = [];
  // isLoading: boolean = true;
  // noRecipesInTheList: boolean = false;


  // categorySet = new Set()
  // categoryArray: {name: string,title: string, catImageUrl:string}[] = []

  // constructor(private apiService: ApiService) { }

  // ngOnInit(): void {
  //   this.apiService.getRecipes().subscribe(
  //     {
  //       next: (recipes) => {

  //         this.recipeList = recipes;

  //         if (this.recipeList.length === 0) {
  //           this.noRecipesInTheList = true;
  //         }

  //         this.isLoading = false
  //         console.log('from categories', this.recipeList)
  //         recipes.forEach(r => {
  //           this.categorySet.add(r.category)
  //         })
  //         console.log(this.categorySet);
  //         for (const item of this.categorySet) {
  //           if (item === "main-dishes") {
  //             this.categoryArray.push(
  //               {
  //                 name: item,
  //                 title: "Main Dishes",
  //                 catImageUrl: 'https://www.marthastewart.com/thmb/wqam34vZiX7GvBsWNZsNFA6OkmE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/lamb-ghouzi-bobbi-lin-0043-d113199-0317-onecms-2000-e5acec4087e849c3847be2251af61331.jpg'
  //               })
  //           }else if(item==="desserts"){
  //             this.categoryArray.push(
  //               {
  //                 name: item,
  //                 title: "Sweets and Desserts",
  //                 catImageUrl: 'https://previews.123rf.com/images/jreika/jreika1302/jreika130200439/17992649-gourmet-desset-american-waffle-and-frozen-raspberry.jpg'
  //               })
  //           }
  //           console.log(item);
  //         }
  //       },
  //       error: (err) => {
  //         this.isLoading = false
  //         console.log(`Error ${err}`);
  //       }
  //     }
  //   );
  //   }


}
