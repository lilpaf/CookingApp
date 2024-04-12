import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropDownDirective {
  @HostBinding('class.open') isOpen = false;

  //@HostListener('click') onClick() {
  //  this.isOpen = !this.isOpen;
  //}

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    const targetElement = event.target as HTMLElement;
    console.log(targetElement)
    this.isOpen = this.elRef.nativeElement.contains(targetElement)
      ? !this.isOpen
      : false;
  }

  constructor(private elRef: ElementRef<HTMLElement>) {}
}
