import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  collapsed = false;
  private showShoopingList = false;
  @Output('shoopingListClicked') showShoopingListEmitter =
    new EventEmitter<boolean>();

  ngOnInit(): void {
    //this.showShoopingListEmitter.emit(this.showShoopingList);
  }

  onShoppingListClicked() {
    this.showShoopingList = true;
    this.showShoopingListEmitter.emit(this.showShoopingList);
  }

  onRecipesClicked() {
    this.showShoopingList = false;
    this.showShoopingListEmitter.emit(this.showShoopingList);
  }
}
