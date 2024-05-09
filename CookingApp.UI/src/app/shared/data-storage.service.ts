import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private url =
    'https://ng-course-recepie-book-33b1f-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getAllRecipes();

    this.httpClient.put(this.url, recipes).subscribe((response) => {
      console.log(response);
      alert('Recipes successfully saved');
    });
  }

  fetchRecipes() {
    this.httpClient.get<Recipe[]>(this.url).subscribe((recipes) => {
      this.recipeService.setRecipes(recipes);
    });
  }
}
