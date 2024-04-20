import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../../shared/models/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  onClickAddIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.recipeService.addIngredientsToShoppingList(ingredients);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const recipeIndex = params['id'];
      this.recipe = this.recipeService.getRecipeByIndex(+recipeIndex);
    });
  }
}
