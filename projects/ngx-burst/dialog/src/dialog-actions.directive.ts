import { Directive } from '@angular/core';

@Directive({
    selector: '[ngxbDialogActions]',
    host: {
        'class': 'dialog-actions'
    }
})
export class NgxbDialogActionsDirective {}
