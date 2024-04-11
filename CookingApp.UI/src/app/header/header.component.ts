import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    collapsed = false;
    private showShoopingList = false;
    @Output('shoopingListClicked') showShoopingListEmitter = new EventEmitter<boolean>();
    
    ngOnInit(): void {
        console.log(this.showShoopingList);
        //this.showShoopingListEmitter.emit(this.showShoopingList);
    }

    onShopingListClicked() {
        this.showShoopingList = true;
        this.showShoopingListEmitter.emit(this.showShoopingList);
    }

    onRecepiesClicked() {
        this.showShoopingList = false;
        this.showShoopingListEmitter.emit(this.showShoopingList);
    }
}