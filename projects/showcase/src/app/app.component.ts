import { Component, inject } from '@angular/core';
import { NgxbButtonDirective } from 'ngx-burst/button';
import { NgxbDialogService, NgxbDialogSize } from 'ngx-burst/dialog';
import { NgxbTooltipDirective, NgxbTooltipPosition } from 'ngx-burst/tooltip';
import { ExampleDialogComponent } from './example-dialog/example-dialog.component';

@Component({
    selector: 'app-root',
    styleUrl: './app.component.scss',
    templateUrl: './app.component.html',
    imports: [
        NgxbButtonDirective,
        NgxbTooltipDirective
    ]
})
export class AppComponent {
    public DialogSize = NgxbDialogSize;
    public TooltipPosition = NgxbTooltipPosition;

    public dialogSize = NgxbDialogSize.minimal;
    public tooltipEnabled = false;

    private _dialogService = inject(NgxbDialogService);

    public dialogSizeChange(event: Event): void {
        this.dialogSize = parseInt((<HTMLSelectElement>(event.target)).value);
    }

    public openDialog(): void {
        const dialogRef = this._dialogService.show(ExampleDialogComponent, this.dialogSize);
        dialogRef.instance.closeCallback = () => {
            console.log('Dialog closed');
        }
    }
}
