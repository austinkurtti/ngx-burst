import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';
import { NgxbDialogService } from './dialog.service';

@Directive({
    host: {
        'class': 'dialog-content'
    }
})
export class NgxbDialogDirective implements AfterViewInit {
    public elementRef = inject(ElementRef);

    public closeCallback: (() => void) | null = null;

    protected dialogService = inject(NgxbDialogService);

    public ngAfterViewInit(): void {
        this.dialogService.initDialogFocus();
    }
}
