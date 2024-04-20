import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const recipeIndex = this.route.snapshot.params['id'];
    if (recipeIndex != null) {
      this.recipe = this.recipeService.getRecipeByIndex(+recipeIndex);
    } else {
      this.recipe = new Recipe('', '', '', []);
    }
  }
}
