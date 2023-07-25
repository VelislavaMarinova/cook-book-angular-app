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

  getRecipe(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Recipe>(`${apiUrl}/recipes/${id}`)

  }

  getCategories() {
    const { apiUrl } = environment;
    return this.http.get<Category[]>(`${apiUrl}/categories`);
  }

  addRecipe(recipe: Recipe) {

    // this.userService.user$$.pipe(take(1), exhaustMap(user => {

    const { apiUrl } = environment;
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'X-Authorization': user!.accessToken
    //   });
    //   console.log(headers,'headers');


    return this.http.post<Recipe>(`${apiUrl}/recipes`, recipe,)
      .subscribe(response => {
        console.log(response);
      });
  }
}
