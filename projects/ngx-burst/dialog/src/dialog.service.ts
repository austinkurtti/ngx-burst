import { ApplicationRef, ComponentRef, Injectable, RendererFactory2, Type, createComponent, inject } from '@angular/core';
import { NgxbDialogSize } from './dialog-size';
import { NgxbDialogDirective } from './dialog.directive';

@Injectable({
    providedIn: 'root'
})
export class NgxbDialogService {
    private _appRef = inject(ApplicationRef);
    private _renderer = inject(RendererFactory2).createRenderer(null, null);

    private _open = false;
    private _dialogRef!: ComponentRef<any>;
    private _unlisteners = new Array<() => void>();

    private get _dialogEl(): HTMLDialogElement {
        let el = document.querySelector('#ngxb-dialog');
        if (!el) {
            el = <HTMLDialogElement>this._renderer.createElement('dialog');
            el.id = 'ngxb-dialog';
            this._renderer.appendChild(document.body, el);
        }
        return <HTMLDialogElement>el;
    }

    private get _tabbableEls(): any {
        const tabbableSelectors = [
            'a:not([disabled])',
            'button:not([disabled])',
            'input:not([disabled])',
            '[tabindex]:not([disabled]):not([tabindex="-1"])'
        ];
        return this._dialogEl.querySelectorAll(tabbableSelectors.join(', '));
    }

    public show<T extends NgxbDialogDirective>(componentType: Type<T>, size = NgxbDialogSize.medium, allowSoftClose = true): ComponentRef<T> {
        // I refuse to allow more than one dialog open at once
        // Just return the dialog that is already open
        if (this._open) {
            return this._dialogRef;
        }

        this._open = true;
        this._dialogEl.show();
        const dialogRef = createComponent(componentType, { environmentInjector: this._appRef.injector });

        // Save component reference
        this._dialogRef = dialogRef;

        // Append component as child of root <dialog> element and register it for change detection
        this._renderer.appendChild(this._dialogEl, dialogRef.location.nativeElement);
        this._appRef.attachView(dialogRef.hostView);

        // Size the dialog
        this._renderer.addClass(this._dialogEl, NgxbDialogSize[size]);

        // Impose tab lock on the dialog
        this._unlisteners.push(this._renderer.listen(this._dialogEl, 'keydown', this._checkTabLock));

        // Dialogs can always be closed with escape key
        this._unlisteners.push(this._renderer.listen(this._dialogEl, 'keydown', this._checkEscape));
        // Conditionally allow dialog to be closed on an outside click
        if (allowSoftClose) {
            this._unlisteners.push(this._renderer.listen(this._dialogEl, 'click', this._checkOutsideClick));
        }

        return dialogRef;
    }

    public close(): void {
        if (!this._open) {
            return;
        }

        this._dialogRef.instance.closeCallback?.();

        // Destroy injected component
        this._dialogRef?.destroy();

        // Unlisten for events
        this._unlisteners.forEach(unlisten => unlisten());
        this._unlisteners = [];

        // Clean up root <dialog> element
        this._renderer.removeAttribute(this._dialogEl, 'class');
        this._dialogEl.close();
        this._open = false;
    }

    public initDialogFocus(): void {
        this._dialogEl.focus();
    }

    private _checkTabLock = (e: KeyboardEvent): void => {
        if (e.code === 'Tab' && this._tabbableEls.length) {
            if (e.shiftKey && (this._tabbableEls[0] === document.activeElement || this._dialogEl === document.activeElement)) {
                this._tabbableEls[this._tabbableEls.length - 1].focus();
                e.preventDefault();
            } else if (!e.shiftKey && this._tabbableEls[this._tabbableEls.length - 1] === document.activeElement) {
                this._tabbableEls[0].focus();
                e.preventDefault();
            }
        }
    };

    private _checkOutsideClick = (e: MouseEvent): void => {
        const dialogBounds = this._dialogRef.location.nativeElement.getBoundingClientRect();
        if (e.clientX < dialogBounds.left || e.clientX > dialogBounds.right || e.clientY < dialogBounds.top || e.clientY > dialogBounds.bottom) {
            this.close();
        }
    };

    private _checkEscape = (e: KeyboardEvent): void => {
        if (e.code === 'Escape') {
            this.close();
        }
    };
}
