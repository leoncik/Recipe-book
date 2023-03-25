import {
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
} from '@angular/core';

@Directive({
    selector: '[appDropdown]',
})
export class DropdownDirective {
    @HostBinding('class.dropdown-open') isOpen = false;

    // Toggles the dropdown when clicking on toggle button
    // @HostListener('click') toggleOpen() {
    //     this.isOpen = !this.isOpen;
    // }

    // Toggles dropdown when clicking on toggle button and closes It when clicking outside of It
    constructor(private elRef: ElementRef) {}
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target)
            ? !this.isOpen
            : false;
    }
}
