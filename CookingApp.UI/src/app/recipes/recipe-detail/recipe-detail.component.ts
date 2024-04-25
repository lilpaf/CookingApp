import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../../shared/models/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeIndex: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onClickAddIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.recipeService.addIngredientsToShoppingList(ingredients);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeIndex = +params['id'];
      this.recipe = this.recipeService.getRecipeByIndex(this.recipeIndex);
    });
  }

  onDeleteRecipe() {
    if (confirm(`Are you sure you want to delete ${this.recipe.name}`)) {
      this.recipeService.deleteRecipeByIndex(this.recipeIndex);
      this.router.navigate(['/recipes']);
    }
  }
}
