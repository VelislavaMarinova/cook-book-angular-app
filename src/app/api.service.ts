import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Recipe } from './types/recipe';
import { Category } from './types/category';
import { UserService } from './user/user.service';
import { exhaustMap, take } from 'rxjs';


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
    return this.http.get<Recipe[]>(`${apiUrl}/recipes?limit=3`)
  }

  getRecipesByCategory(category: string) {
    const { apiUrl } = environment
    return this.http.get<Recipe[]>(`${apiUrl}/recipes?where=category%3D%22${category}%22`);
  }

  getRecipe(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Recipe>(`${apiUrl}/recipes/${id}`)

  }

  getCategories() {
    const { apiUrl } = environment;
    return this.http.get<Category[]>(`${apiUrl}/categories`);
  }

  addRecipe(recipe: Recipe) {

    const { apiUrl } = environment;

    return this.http.post<Recipe>(`${apiUrl}/recipes`, recipe,)
     
  }
}
