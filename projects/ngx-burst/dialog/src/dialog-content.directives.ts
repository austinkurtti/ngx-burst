import { Directive } from '@angular/core';

@Directive({
    selector: '[ngxbDialogHeader]',
    host: {
        'class': 'dialog-header'
    }
})
export class NgxbDialogHeaderDirective {}

@Directive({
    selector: '[ngxbDialogBody]',
    host: {
        'class': 'dialog-body'
    }
})
export class NgxbDialogBodyDirective {}

@Directive({
    selector: '[ngxbDialogActions]',
    host: {
        'class': 'dialog-actions'
    }
})
export class NgxbDialogActionsDirective {}
