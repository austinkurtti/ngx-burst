import { Directive, HostListener, inject, input, output } from '@angular/core';
import { NgxbMenuDirective } from './menu.directive';

@Directive({
    selector: '[ngxbMenuItem]',
    host: {
        'role': 'menuitem',
        'tabindex': '0',
        '[class.disabled]': 'disabled()'
    }
})
export class NgxbMenuItemDirective {
    public disabled = input(false);

    public menuItemClick = output<void>();

    public menu = inject(NgxbMenuDirective);

    @HostListener('click', ['$event']) itemClick(event: PointerEvent): void {
        if (!this.disabled) {
            this.menuItemClick.emit();
            this.menu.close();
        }
    }
}
