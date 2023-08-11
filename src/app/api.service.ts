import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Recipe } from './types/recipe';
import { Category } from './types/category';
import { UserService } from './user/user.service';
import { Subject, exhaustMap, take } from 'rxjs';
import { ApiResponse } from './types/response';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private userService: UserService) { }



  getRecipes() {
    const { apiUrl } = environment
    return this.http.get<Recipe[]>(`${apiUrl}/recipes`);
  }

  getRecipesByLimit() {
    const { apiUrl } = environment
    return this.http.get<Recipe[]>(`${apiUrl}/recipes?limit=4`)
  }

  // getRecipesByCategory(category: string) {
  //   const { apiUrl } = environment;
  //   return this.http.get<Recipe[]>(`${apiUrl}/recipes?where=category%3D%22${category}%22`);
  // }

  getRecipesByUserId(userId: string) {
    const { apiUrl } = environment;
    return this.http.get<Recipe[]>(`${apiUrl}/recipes?where=_ownerId%3D%22${userId}%22`)
  }
  getByCategorySortedByDateWithPagination(category:string,page:number,perPage:number){
    const { apiUrl } = environment;
    return this.http.get<ApiResponse>(
      `${apiUrl}/recipes?where=category%3D%22${category}%22&page=${page}&perPage=${perPage}`)
      .pipe(map((res: ApiResponse) => res))
  }

  getRecipe(recipeId: string) {
    const { apiUrl } = environment;
    return this.http.get<Recipe>(`${apiUrl}/recipes/${recipeId}`)

  }

  getCategories() {
    const { apiUrl } = environment;
    return this.http.get<Category[]>(`${apiUrl}/categories`);
  }

  addRecipe(recipe: Recipe) {

    const { apiUrl } = environment;

    return this.http.post<Recipe>(`${apiUrl}/recipes`, recipe,)

  }

  editRecipe(newRecipe: Recipe, recipeId: string) {
    const { apiUrl } = environment;
    return this.http.put<Recipe>(`${apiUrl}/recipes/${recipeId}`, newRecipe)
  }

  deleteRecipe(recipeId: string) {
    const { apiUrl } = environment;
    return this.http.delete(`${apiUrl}/recipes/${recipeId}`)
  }

  addCategory(newCategory:Category){
    const { apiUrl } = environment;
    return this.http.post<Category>(`${apiUrl}/categories`,newCategory)
  }
}
