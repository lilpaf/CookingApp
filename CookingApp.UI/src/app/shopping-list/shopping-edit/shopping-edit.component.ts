import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('unitInput') unitInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddClicked() {
    const name: string = this.nameInputRef.nativeElement.value;
    const amount: number = this.amountInputRef.nativeElement.value;
    const unit: string = this.unitInputRef.nativeElement.value;

    const ingredient = new Ingredient(name, amount, unit);

    this.shoppingListService.addIngredient(ingredient);
  }
}
