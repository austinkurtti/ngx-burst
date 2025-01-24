import { Directive } from '@angular/core';

@Directive({
    selector: '[ngxbButton]',
    host: {
        'class': 'ngxb-button'
    }
})
export class NgxbButtonDirective {}
