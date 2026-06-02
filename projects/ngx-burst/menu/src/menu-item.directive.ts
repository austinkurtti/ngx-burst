import { Directive, inject, input, output } from '@angular/core';
import { NgxbMenuDirective } from './menu.directive';

@Directive({
    selector: '[ngxbMenuItem]',
    host: {
        'role': 'menuitem',
        'tabindex': '0',
        '[class.disabled]': 'disabled()',
        '(click)': 'itemClick($event)',
        '(keydown)': 'itemKeydown($event)'
    }
})
export class NgxbMenuItemDirective {
    public disabled = input(false);

    public menuItemClick = output<void>();

    public menu = inject(NgxbMenuDirective);

    public itemClick(event: PointerEvent): void {
        this._doClick();
    }

    public itemKeydown(event: KeyboardEvent): void {
        if (event.code === 'ArrowDown') {
            event.preventDefault();
            this.menu.focusNext();
        } else if (event.code === 'ArrowUp') {
            event.preventDefault();
            this.menu.focusNext(false);
        } else if (event.code === 'Tab' || event.code === 'Escape') {
            event.preventDefault();
            this.menu.close(true);
        } else if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
            this._doClick(true);
        }
    }

    private _doClick(refocusHost = false): void {
        if (!this.disabled()) {
            this.menuItemClick.emit();
            this.menu.close(refocusHost);
        }
    }
}
