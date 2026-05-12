import { Component } from '@angular/core';
import { NgxbButtonDirective } from 'ngx-burst/button';
import { NgxbDialogActionsDirective, NgxbDialogBodyDirective, NgxbDialogDirective, NgxbDialogHeaderDirective } from 'ngx-burst/dialog';

@Component({
    selector: 'app-example-dialog',
    templateUrl: './example-dialog.component.html',
    imports: [
        NgxbButtonDirective,
        NgxbDialogActionsDirective,
        NgxbDialogBodyDirective,
        NgxbDialogHeaderDirective
    ]
})
export class ExampleDialogComponent extends NgxbDialogDirective {}
