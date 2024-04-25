import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingListEditComponent implements OnInit {
  editMode = false;
  ingredient = new Ingredient(null, null, null);
  id?: number;
  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id'] !== undefined) {
        this.id = +params['id'];
        this.ingredient = this.shoppingListService.getIngredientByIndex(
          this.id
        );
        this.editMode = true;
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount, value.unit);

    if (this.id !== undefined) {
      this.shoppingListService.updateIngredientByIndex(ingredient, this.id);
      this.onClear();
    } else {
      this.shoppingListService.addIngredient(ingredient);
      form.reset();
    }
  }

  onClear() {
    this.router.navigate(['/shopping-list']);
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.id);
    this.onClear();
  }
}
