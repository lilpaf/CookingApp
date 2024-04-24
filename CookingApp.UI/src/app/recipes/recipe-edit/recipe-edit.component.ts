import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../models/recipe.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const recipeIngredients = new FormArray([]);
    this.route.params.subscribe((params: Params) => {
      const recipeIndex = params['id'];
      if (recipeIndex != null) {
        this.recipe = this.recipeService.getRecipeByIndex(+recipeIndex);
        for (let ingredient of this.recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              ingredientName: new FormControl(ingredient.name),
              ingredientAmount: new FormControl(ingredient.amount),
              ingredientUnit: new FormControl(ingredient.unit),
            })
          );
        }
      } else {
        this.recipe = new Recipe(null, null, null, []);
      }
    });

    this.recipeForm = new FormGroup({
      name: new FormControl(this.recipe.name, Validators.required),
      description: new FormControl(
        this.recipe.description,
        Validators.required
      ),
      imagePath: new FormControl(this.recipe.imagePath, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onSubmit() {}

  getIngredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}
