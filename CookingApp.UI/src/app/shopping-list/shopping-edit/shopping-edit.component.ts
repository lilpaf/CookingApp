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
  id: number;
  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      if (this.id !== undefined) {
        this.ingredient = this.shoppingListService.getIngredient(this.id);
        this.editMode = true;
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount, value.unit);

    if (this.id !== undefined) {
      this.shoppingListService.updateIngredient(ingredient, this.id);
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
