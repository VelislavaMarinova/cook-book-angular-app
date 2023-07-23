import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Recipe } from './types/recipe';
import { Category } from './types/category';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getRecipes() {
    const { appUrl } = environment
    return this.http.get<Recipe[]>(`${appUrl}/recipes`);
  }

  getRecipe(id: string) {
    const { appUrl } = environment;
    return this.http.get<Recipe>(`${appUrl}/recipes/${id}`)

  }

  getCategories(){
    const { appUrl } = environment;
    return this.http.get<Category[]>(`${appUrl}/categories`);
  }
}
