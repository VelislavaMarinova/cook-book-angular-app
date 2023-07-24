import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Recipe } from './types/recipe';
import { Category } from './types/category';
import { UserService } from './user/user.service';


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

  getRecipe(id: string) {
    const { apiUrl: apiUrl } = environment;
    return this.http.get<Recipe>(`${apiUrl}/recipes/${id}`)

  }

  getCategories(){
    const { apiUrl: apiUrl } = environment;
    return this.http.get<Category[]>(`${apiUrl}/categories`);
  }
}
