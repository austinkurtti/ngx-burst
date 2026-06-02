import { Directive, ElementRef, Renderer2, TemplateRef, ViewContainerRef, computed, contentChild, inject, input, output, signal } from '@angular/core';
import { NgxbMenuPosition, NgxbMenuWidth } from './menu-settings';

const BODY_TAG_NAME = 'BODY';

/**
 * TODO
 * - Add ARIA attributes
 */
@Directive({
    selector: '[ngxbMenu]',
    exportAs: 'ngxbMenu',
    host: {
        'tabindex': '0',
        'class': 'menu-host',
        '(click)': 'hostClick($event)',
        '(keydown)': 'hostKeydown($event)'
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
     * TODO
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
    private _menuEl: any;
    // TODO - probably add more to this
    private _focusableSelectors = ['[ngxbmenuitem]:not(.disabled)'];

    public hostClick(event: PointerEvent): void {
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

    public hostKeydown(event: KeyboardEvent): void {
        if (event.code === 'ArrowDown' || event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
            this.open();
            this.focusNext();
        }
    }

    public open = (): void => {
        if (this._isOpen() || this.menuContent() === undefined) {
            return;
        }

        const menu = this._viewContainerRef.createEmbeddedView(this.menuContent()!);
        // Give menu components a complete cycle to settle their views and bindings before calculating positioning
        menu.detectChanges();

        // Size the menu - this must be done before positioning
        const hostRect = this._elementRef.nativeElement.getBoundingClientRect();
        const menuEl = menu.rootNodes[0];
        this._menuEl = menuEl;
        if (this.menuWidth() === NgxbMenuWidth.matchParent) {
            this._renderer.setStyle(menuEl, 'width', `${hostRect.width}px`);
        } else {
            this._renderer.setAttribute(menuEl, 'menu-width', this.menuWidth());
        }

        // Position the menu
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
                this._positionStart(menuEl);
            } else {
                this._positionEnd(menuEl);
            }
        } else if (this._positionedAt(NgxbMenuPosition.topStart) || this._positionedAt(NgxbMenuPosition.bottomStart)) {
            if (menuEl.clientWidth > (document.body.clientWidth - hostRect.left)) {
                this._positionEnd(menuEl);
            } else {
                this._positionStart(menuEl);
            }
        }

        this._isOpen.set(true);
        this.isOpenChanged.emit(this.isOpen());
    };

    public close = (refocusHost = false): void => {
        this._menuEl = null;
        this._viewContainerRef.clear();
        this._isOpen.set(false);
        this.isOpenChanged.emit(this.isOpen());

        if (refocusHost) {
            this._elementRef.nativeElement.focus();
        }
    };

    public containsEventTarget = (target: EventTarget): boolean => this._elementRef.nativeElement.contains(target);

    public focusNext = (forwards = true): void => {
        const focusableElements: HTMLElement[] = Array.from(this._menuEl.querySelectorAll(this._focusableSelectors));
        if (focusableElements.length === 0) {
            return;
        }

        const focusedFocusableElIndex = focusableElements.findIndex(e => e === document.activeElement);
        if (focusedFocusableElIndex === -1) {
            focusableElements[0].focus();
        } else {
            let nextFocusableElIndex = focusedFocusableElIndex + (forwards ? 1 : -1);
            if (nextFocusableElIndex === focusableElements.length) {
                nextFocusableElIndex = 0;
            } else if (nextFocusableElIndex === -1) {
                nextFocusableElIndex = focusableElements.length - 1;
            }
            focusableElements[nextFocusableElIndex].focus();
        }
    }

    private _positionedAt = (position: NgxbMenuPosition): boolean => (this.menuPosition() & position) !== 0;

    /**
     * ! IMPORTANT
     * In the below _position* methods, hostRect is retrieved right before positioning to get the
     * most up-to-date bounding client rectangle. Otherwise, any previous positioning that has been
     * performed may skew the viewport slightly and affect the height/width of the host element.
     */

    private _positionTop(menuEl: any): void {
        const hostRect = this._elementRef.nativeElement.getBoundingClientRect();
        const offsetParent = this._elementRef.nativeElement.offsetParent;
        const offsetParentRect = offsetParent.getBoundingClientRect();
        const topValue = offsetParent.tagName === BODY_TAG_NAME
            ? hostRect.top - menuEl.clientHeight + window.scrollY
            : (menuEl.clientHeight - (hostRect.top - offsetParentRect.top)) * -1;
        this._renderer.setStyle(menuEl, 'top', `${topValue}px`);
    }

    private _positionEnd(menuEl: any): void {
        const hostRect = this._elementRef.nativeElement.getBoundingClientRect();
        const offsetParent = this._elementRef.nativeElement.offsetParent.tagName;
        let leftValue = offsetParent === BODY_TAG_NAME
            ? hostRect.x + hostRect.width - menuEl.clientWidth
            : hostRect.width - menuEl.clientWidth;
        leftValue = leftValue < 0 ? 0 : leftValue;
        this._renderer.setStyle(menuEl, 'left', `${leftValue}px`);
    }

    private _positionBottom(menuEl: any): void {
        const hostRect = this._elementRef.nativeElement.getBoundingClientRect();
        const offsetParent = this._elementRef.nativeElement.offsetParent;
        const offsetParentRect = offsetParent.getBoundingClientRect();
        const topValue = offsetParent.tagName === BODY_TAG_NAME
            ? hostRect.bottom + window.scrollY
            : hostRect.height + (hostRect.top - offsetParentRect.top);
        this._renderer.setStyle(menuEl, 'top', `${topValue}px`);
    }

    private _positionStart(menuEl: any): void {
        const hostRect = this._elementRef.nativeElement.getBoundingClientRect();
        const offsetParent = this._elementRef.nativeElement.offsetParent.tagName;
        let leftValue = offsetParent === BODY_TAG_NAME
            ? hostRect.left
            : 0;
        leftValue = leftValue + menuEl.clientWidth > document.body.clientWidth ? document.body.clientWidth - menuEl.clientWidth : leftValue;
        this._renderer.setStyle(menuEl, 'left', `${leftValue}px`);
    }
}
