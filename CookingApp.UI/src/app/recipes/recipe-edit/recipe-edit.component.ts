import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../models/recipe.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/models/ingredient.model';
import { NumberValidatorDirective } from '../../shared/directives/number.validator.directive';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  recipeForm: FormGroup;
  recipeIndex: number;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const recipeIngredients = new FormArray([]);
    this.route.params.subscribe((params: Params) => {
      if (params['id'] !== undefined) {
        this.recipeIndex = +params['id'];
        this.recipe = this.recipeService.getRecipeByIndex(this.recipeIndex);

        for (let ingredient of this.recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              ingredientName: new FormControl(
                ingredient.name,
                Validators.required
              ),
              ingredientAmount: new FormControl(ingredient.amount, [
                Validators.required,
                NumberValidatorDirective.validate,
              ]),
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

  onSubmit() {
    const value = this.recipeForm.value;
    this.recipe.name = value.name;
    this.recipe.description = value.description;
    this.recipe.imagePath = value.imagePath;
    this.recipe.ingredients = this.extractFormIngredients();

    if (this.recipeIndex !== undefined) {
      this.recipeService.updateRecipeByIndex(this.recipe, this.recipeIndex);
      this.recipeForm.reset();
      return;
    }
    this.recipeService.addRecipe(this.recipe);
    this.onCancel();
  }

  getIngredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        ingredientName: new FormControl(null, Validators.required),
        ingredientAmount: new FormControl(null, [
          Validators.required,
          NumberValidatorDirective.validate,
        ]),
        ingredientUnit: new FormControl(null),
      })
    );
  }

  onRemoveIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  extractFormIngredients() {
    const newIngredients: Ingredient[] = [];
    const formIngredients = this.getIngredientControls();

    for (let ingredient of formIngredients) {
      newIngredients.push(
        new Ingredient(
          ingredient.value.ingredientName,
          ingredient.value.ingredientAmount,
          ingredient.value.ingredientUnit
        )
      );
    }

    return newIngredients;
  }
}
