import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      'Meat recipe',
      'This is a meat recipe',
      'https://www.foodandwine.com/thmb/CqyQH1MrXLynH3iZ0PEEfZ4Ki6Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/steak-au-poivre-red-wine-pan-sauce-hero-01-FT-RECIPE1222-c9e1da15f33f4076986b6ce37ae5bbb0.jpg',
      [new Ingredient('meat', 1)]
    ),
    new Recipe(
      'Pancake recipe',
      'This is a pancake recipe',
      'https://hips.hearstapps.com/hmg-prod/images/crepes-index-64347419e3c7a.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
      [new Ingredient('milk', 200, 'ml'), new Ingredient('sugar', 300, 'g')]
    ),
  ];

  getAllRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // ingredients.forEach((ingredient) => {
    //   this.shoppingListService.addIngredient(ingredient);
    // });
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipeByIndex(index: number) {
    const recipe = this.recipes[index];
    return new Recipe(
      recipe.name,
      recipe.description,
      recipe.imagePath,
      recipe.ingredients
    );
  }

  updateRecipeByIndex(recipe: Recipe, index: number) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.getAllRecipes());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getAllRecipes());
  }

  deleteRecipeByIndex(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getAllRecipes());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getAllRecipes());
  }
}
