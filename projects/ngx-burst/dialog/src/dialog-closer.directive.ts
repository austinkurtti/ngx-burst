import { Directive, inject } from '@angular/core';
import { NgxbDialogService } from './dialog.service';

@Directive({
    selector: '[ngxbDialogCloser]',
    host: {
        '(click)': 'closerClick()',
        '(keydown)': 'closerKeydown($event)'
    }
})
export class NgxbDialogCloserDirective {
    private _dialogService = inject(NgxbDialogService);

    public closerClick() {
        this._dialogService.close();
    }

    public closerKeydown(event: KeyboardEvent) {
        if (event.code === 'Space' || event.code === 'Enter' || event.code === 'NumpadEnter') {
            event.preventDefault();
            this._dialogService.close(true);
        }
    }
}
