import { Directive } from '@angular/core';

@Directive({
    selector: '[ngxbDialogBody]',
    host: {
        'class': 'dialog-body'
    }
})
export class NgxbDialogBodyDirective {}
