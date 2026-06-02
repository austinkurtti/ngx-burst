import { Directive, inject, input } from '@angular/core';
import { NgxbDialogService } from './dialog.service';

@Directive({
    selector: '[ngxbDialogOpener]',
    host: {
        '(click)': 'openerClick()',
        '(keydown)': 'openerKeydown($event)'
    }
})
export class NgxbDialogOpenerDirective {
    /**
     * Callback to create and show the desired dialog.
     *
     * WARNING: Given callback needs to be an arrow function! Otherwise injected NgxbDialogService will be undefined in the callback's scope.
     */
    public openDialog = input.required<() => void>();

    private _dialogService = inject(NgxbDialogService);

    public openerClick(): void {
        this.openDialog()();
    }

    public openerKeydown(event: KeyboardEvent): void {
        if (event.code === 'Space' || event.code === 'Enter' || event.code === 'NumpadEnter') {
            event.preventDefault();
            this._dialogService.focusVisibleOnOpen = true;
            this.openDialog()();
        }
    }
}
