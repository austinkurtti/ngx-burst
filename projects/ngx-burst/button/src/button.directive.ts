import { Directive, input } from '@angular/core';
import { NgxbButtonType } from './button-type';

@Directive({
    selector: '[ngxbButton]',
    host: {
        'class': 'ngxb-button',
        '[class]': 'ButtonType[type()]'
    }
})
export class NgxbButtonDirective {
    public type = input<NgxbButtonType>(NgxbButtonType.primary);

    public ButtonType = NgxbButtonType;
}
