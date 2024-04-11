import { Component } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('Berries', 6),
    new Ingredient('Milk', 200, 'ml'),
    new Ingredient('Sugar', 200, 'mg')
  ];

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
