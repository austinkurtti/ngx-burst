import { contentChildren, Directive, input } from '@angular/core';
import { NgxbAccordionContentDirective } from './accordion-content.directive';

@Directive({
    selector: '[ngxbAccordionGroup]',
    exportAs: 'ngxbAccordionGroup',
    host: {
        'class': 'ngxb-accordion-group'
    }
})
export class NgxbAccordionGroupDirective {
    // Determines if all accordion contents can be collapsed at the same time
    public fullCollapsible = input(true);
    // Determines if more than one accordion content can be expanded at the same time
    public multiExpandable = input(false);

    public headers = contentChildren(NgxbAccordionGroupDirective, { descendants: true });
    public contents = contentChildren(NgxbAccordionContentDirective, { descendants: true });

    public toggle(contentId: string): void {
        const content = this.contents().find(c => c.contentId() === contentId);

        if (content) {
            // Check if this content cannot be collapsed
            if (content.expanded() && !this.fullCollapsible() && this.contents().filter(c => c.expanded()).length === 1) {
                return;
            }

            // Check if other accordion contents must be collapsed
            if (!content.expanded() && !this.multiExpandable()) {
                this.contents().forEach(c => c.expanded.set(false));
            }

            content.expanded.set(content.expanded() ? false : true);
        }
    }
}
