import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is a test', 'https://hips.hearstapps.com/hmg-prod/images/crepes-index-64347419e3c7a.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*'),
    new Recipe('A test recipe 2', 'This is a test', 'https://hips.hearstapps.com/hmg-prod/images/crepes-index-64347419e3c7a.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*')
  ];

  @Output() recipeClicked = new EventEmitter<Recipe>();
  constructor() {

  }

  ngOnInit(): void {
    
  }

  onClickRecepie(recipe: Recipe) {
    this.recipeClicked.emit(recipe);
  }

}
