import { Directive, input, model } from '@angular/core';

@Directive({
    selector: '[ngxbAccordionContent]',
    exportAs: 'ngxbAccordionContent',
    host: {
        'class': 'ngxb-accordion-content',
        '[class.d-none]': '!expanded()'
    }
})
export class NgxbAccordionContentDirective {
    public contentId = input.required<string>();
    public expanded = model(false);
}
