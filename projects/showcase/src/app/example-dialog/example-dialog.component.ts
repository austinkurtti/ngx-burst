import { Component } from '@angular/core';
import { NgxbButtonDirective, NgxbButtonType } from '@austinkurtti/ngx-burst/button';
import { NgxbDialogActionsDirective, NgxbDialogBodyDirective, NgxbDialogCloserDirective, NgxbDialogDirective, NgxbDialogHeaderDirective } from '@austinkurtti/ngx-burst/dialog';

@Component({
    selector: 'app-example-dialog',
    templateUrl: './example-dialog.component.html',
    imports: [
        NgxbButtonDirective,
        NgxbDialogActionsDirective,
        NgxbDialogBodyDirective,
        NgxbDialogCloserDirective,
        NgxbDialogHeaderDirective
    ]
})
export class ExampleDialogComponent extends NgxbDialogDirective {
    public ButtonType = NgxbButtonType;
}
