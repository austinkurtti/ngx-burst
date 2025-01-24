import { Component } from '@angular/core';
import { NgxbDialogActionsDirective, NgxbDialogBodyDirective, NgxbDialogDirective, NgxbDialogHeaderDirective } from 'ngx-burst/dialog';

@Component({
    selector: 'app-example-dialog',
    templateUrl: './example-dialog.component.html',
    imports: [
        NgxbDialogActionsDirective,
        NgxbDialogBodyDirective,
        NgxbDialogHeaderDirective
    ]
})
export class ExampleDialogComponent extends NgxbDialogDirective {}
