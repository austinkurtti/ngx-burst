import { Directive } from '@angular/core';

@Directive({
    selector: '[ngxbDialogHeader]',
    host: {
        'class': 'dialog-header'
    }
})
export class NgxbDialogHeaderDirective {}
