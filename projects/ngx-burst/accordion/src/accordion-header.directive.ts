import { computed, Directive, inject, input } from '@angular/core';
import { NgxbAccordionGroupDirective } from './accordion-group.directive';

@Directive({
    selector: '[ngxbAccordionHeader]',
    exportAs: 'ngxbAccordionHeader',
    host: {
        'role': 'button',
        'class': 'ngxb-accordion-header',
        '[class.expanded]': 'contentExpanded()',
        '(click)': 'toggle($event)'
    }
})
export class NgxbAccordionHeaderDirective {
    public contentId = input.required<string>();
    public contentExpanded = computed(() => {
        const content = this._group.contents().find(c => c.contentId() === this.contentId());
        return content ? content.expanded() : false;
    });

    private _group = inject(NgxbAccordionGroupDirective);

    public toggle(event: PointerEvent): void {
        this._group.toggle(this.contentId());
        event.stopPropagation();
    }
}
