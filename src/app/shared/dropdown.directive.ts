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

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }
}
