import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/model/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('unitInput') unitInputRef: ElementRef;

  @Output() onIngridientAdd = new EventEmitter<Ingredient>()

  onAddClicked() {
    const name: string = this.nameInputRef.nativeElement.value;
    const amount: number = this.amountInputRef.nativeElement.value;
    const unit: string = this.unitInputRef.nativeElement.value;

    const ingredient = new Ingredient(name, amount, unit)

    this.onIngridientAdd.emit(ingredient)
  }
}
