import { Directive, ElementRef, HostListener, Renderer2, TemplateRef, ViewContainerRef, computed, contentChild, inject, input, output, signal } from '@angular/core';
import { NgxbMenuPosition, NgxbMenuWidth } from './menu-settings';

/**
 * TODO:
 * Add ARIA attributes
 */
@Directive({
    selector: '[ngxbMenu]',
    exportAs: 'ngxbMenu',
    host: {
        'tabindex': '0',
        'class': 'menu-host'
    }
})
export class NgxbMenuDirective {
    public menuPosition = input(NgxbMenuPosition.bottomEnd);
    public menuWidth = input(NgxbMenuWidth.auto);

    /**
     * A little clunky to need a <ng-template> wrapping an element using ngxbMenuContent. But this does bring the advantage
     * of the menu content not being a direct child of the menu host, meaning there is no style cascade. The menu content
     * does not need to worry about inherting unwanted styles from a the host, and the host doesn't need to worry about
     * having hover styles activated by the content (which would put the responsibility on the implementer to negate that).
     * 
     * TODO:
     * Could look into possibly changing this to a direct <ng-template> element with ngxbMenuContent attached to it, then
     * inserting and managing a wrapper div around the template content.
     */
    public menuContent = contentChild('menuContent', { read: TemplateRef });

    public isOpenChanged = output<boolean>();

    public isOpen = computed(() => this._isOpen());

    private _elementRef = inject(ElementRef);
    private _viewContainerRef = inject(ViewContainerRef);
    private _renderer = inject(Renderer2);

    private _isOpen = signal(false);

    @HostListener('click', ['$event'])
    @HostListener('keydown', ['$event'])
    hostClick(event: KeyboardEvent | PointerEvent): void {
        if (this._isOpen()) {
            this.close();
        } else {
            // Only open the menu after the entire click event loop finishes
            // menu-content.directive attaches it's _outsideClickListener to the document, which will execute last in the event
            // This allows any currently open menu to close first and prevents the view from jolting around as menus simultaneously calcuate their sizes
            setTimeout(() => {
                this.open();
            }, 0);
        }
    }

    public open = (): void => {
        if (this.menuContent() === undefined) {
            return;
        }

        const menu = this._viewContainerRef.createEmbeddedView(this.menuContent()!);
        // Give menu components a complete cycle to settle their views and bindings before calculating positioning
        menu.detectChanges();

        // Size the menu - this must be done before positioning
        const menuEl = menu.rootNodes[0];
        this._renderer.setStyle(menuEl, 'width', this.menuWidth());

        // Position the menu
        const hostRect = this._elementRef.nativeElement.getBoundingClientRect();
        if (this._positionedAt(NgxbMenuPosition.topStart) || this._positionedAt(NgxbMenuPosition.topEnd)) {
            if (menuEl.clientHeight > hostRect.top) {
                this._positionBottom(menuEl);
            } else {
                this._positionTop(menuEl);
            }
        } else if (this._positionedAt(NgxbMenuPosition.bottomStart) || this._positionedAt(NgxbMenuPosition.bottomEnd)) {
            if (menuEl.clientHeight > (document.body.clientHeight - hostRect.bottom)) {
                this._positionTop(menuEl);
            } else {
                this._positionBottom(menuEl);
            }
        }
        if (this._positionedAt(NgxbMenuPosition.topEnd) || this._positionedAt(NgxbMenuPosition.bottomEnd)) {
            if (menuEl.clientWidth > hostRect.right) {
                this._positionLeft(menuEl);
            } else {
                this._positionRight(menuEl);
            }
        } else if (this._positionedAt(NgxbMenuPosition.topStart) || this._positionedAt(NgxbMenuPosition.bottomStart)) {
            if (menuEl.clientWidth > (document.body.clientWidth - hostRect.left)) {
                this._positionRight(menuEl);
            } else {
                this._positionLeft(menuEl);
            }
        }

        this._isOpen.set(true);
        this.isOpenChanged.emit(this.isOpen());
    };

    public close = (): void => {
        this._viewContainerRef.clear();
        this._isOpen.set(false);
        this.isOpenChanged.emit(this.isOpen());
    };

    public containsEventTarget = (target: EventTarget): boolean => this._elementRef.nativeElement.contains(target);

    private _positionedAt = (position: NgxbMenuPosition): boolean => (this.menuPosition() & position) !== 0;

    /**
     * ! IMPORTANT
     * In the below _position* methods, hostRect is retrieved right before positioning to get the
     * most up-to-date bounding client rectangle. Otherwise, any previous positioning that has been
     * performed may skew the viewport slightly and affect the height/width of the host element.
     * 
     * TODO:
     * Large menu widths can cause menus to get pushed off screen. Need to do some more checks to ensure
     * the _positionedAt method is sufficient enough to determine if menu will be fully on screen.
     */

    private _positionTop(menuEl: any): void {
        const hostRect = this._elementRef.nativeElement.getBoundingClientRect();
        this._renderer.setStyle(menuEl, 'top', `${hostRect.top - menuEl.clientHeight}px`);
    }

    private _positionRight(menuEl: any): void {
        const hostRect = this._elementRef.nativeElement.getBoundingClientRect();
        let leftValue = hostRect.x + hostRect.width - menuEl.clientWidth;
        leftValue = leftValue < 0 ? 0 : leftValue;
        this._renderer.setStyle(menuEl, 'left', `${leftValue}px`);
    }

    private _positionBottom(menuEl: any): void {
        const hostRect = this._elementRef.nativeElement.getBoundingClientRect();
        this._renderer.setStyle(menuEl, 'top', `${hostRect.bottom}px`);
    }

    private _positionLeft(menuEl: any): void {
        const hostRect = this._elementRef.nativeElement.getBoundingClientRect();
        this._renderer.setStyle(menuEl, 'left', `${hostRect.left}px`);
    }
}
