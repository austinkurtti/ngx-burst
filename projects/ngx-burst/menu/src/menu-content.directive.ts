import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
import { NgxbMenuDirective } from './menu.directive';

@Directive({
    selector: '[ngxbMenuContent]',
    host: {
        'role': 'menu',
        'class': 'position-absolute'
    }
})
export class NgxbMenuContentDirective implements OnInit, OnDestroy {
    public menu = inject(NgxbMenuDirective);

    private _elementRef = inject(ElementRef);

    public ngOnInit(): void {
        document.addEventListener('click', this._outsideClickListener);
        this._elementRef.nativeElement.addEventListener('focusin', this._focusInListener);
    }

    public ngOnDestroy(): void {
        document.removeEventListener('click', this._outsideClickListener);
        this._elementRef.nativeElement.removeEventListener('focusin', this._focusInListener);
        this._elementRef.nativeElement.removeEventListener('focusout', this._focusOutListener);
    }

    private _outsideClickListener = (event: PointerEvent): void => {
        if (!this._elementRef.nativeElement.contains(event.target) && event.target && !this.menu.containsEventTarget(event.target)) {
            this.menu.close();
        }
    }

    private _focusInListener = (event: FocusEvent): void => {
        this._elementRef.nativeElement.addEventListener('focusout', this._focusOutListener);
        this._elementRef.nativeElement.removeEventListener('focusin', this._focusInListener);
    };

    private _focusOutListener = (event: FocusEvent): void => {
        if (event.relatedTarget && !(event.currentTarget as HTMLElement).contains(event.relatedTarget as HTMLElement)) {
            this.menu.close();
        }
    };
}
