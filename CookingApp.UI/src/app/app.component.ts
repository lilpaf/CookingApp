import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @Input() showShoppingList: boolean;

  onShoopingListClicked(show: boolean) {
    this.showShoppingList = show;
  }
}
