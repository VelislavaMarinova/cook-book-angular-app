import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user/user.service';
import { Recipe } from 'src/app/types/recipe';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy{
  private userSub!: Subscription;
  username: string | undefined;
  email:string | undefined;
  recipes: Recipe[]=[];
  userId:string | undefined
  noRecipesInTheList:boolean=false;
  isLoading:boolean=false;

  numRecipesPerPage: number = 8;
  numLoadedRecipes: number = 0;
  loadMore: boolean = true;
  recipesToLoad: Recipe[] = [];

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    ){}

  ngOnInit(): void {
    this.userSub = this.userService.user$$.subscribe(user => {
      this.username=user?.username
      this.email=user?.email
      this.userId=user?._id
    });
    this.loadData()
  }

  loadData() {
    this.isLoading=true;
    this.apiService.getRecipesByUserId(this.userId!).subscribe(
      {
        next: (result) => {

          this.recipes = result;

          if (this.recipes.length === 0) {
            this.noRecipesInTheList = true;
            this.recipesToLoad = [];
          } else {
            this.recipesToLoad = this.recipes.slice(0, this.numRecipesPerPage);
            this.numLoadedRecipes = this.recipesToLoad.length;

            if (this.recipes.length <= this.numRecipesPerPage) {
              this.loadMore = false;
            } else {
              this.loadMore = true;
            }
          }

          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false
          console.log(`Error ${err.message}`);

        }
      })
  }

  onLoadMore() {

    this.recipesToLoad = this.recipes!.slice(0, this.numLoadedRecipes + this.numRecipesPerPage)
    this.numLoadedRecipes = this.recipesToLoad.length;

    if (this.numLoadedRecipes === this.recipes?.length) {
      this.loadMore = false;
    }

  }

  ngOnDestroy(): void {
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }

}
