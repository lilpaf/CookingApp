import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingListEditComponent implements OnInit {
  ingredient = new Ingredient(null, null, null);
  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id !== undefined) {
        this.ingredient = this.shoppingListService.getIngredient(+id);
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredientToAdd = new Ingredient(
      value.name,
      value.amount,
      value.unit
    );
    this.shoppingListService.addIngredient(ingredientToAdd);
    form.reset();
  }
}
