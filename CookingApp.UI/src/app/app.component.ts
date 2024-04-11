import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @Input() showShoopingList: boolean;

  onShoopingListClicked(show: boolean) {
    this.showShoopingList = show;
  }
}
