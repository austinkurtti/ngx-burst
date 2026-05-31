import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxbAccordionContentDirective, NgxbAccordionGroupDirective, NgxbAccordionHeaderDirective } from 'ngx-burst/accordion';
import { NgxbButtonDirective, NgxbButtonType } from 'ngx-burst/button';
import { NgxbCheckboxComponent } from 'ngx-burst/checkbox';
import { NgxbDialogService, NgxbDialogSize } from 'ngx-burst/dialog';
import { NgxbMenuContentDirective, NgxbMenuDirective, NgxbMenuItemDirective, NgxbMenuPosition, NgxbMenuWidth } from 'ngx-burst/menu';
import { NgxbRadioGroupComponent, RadioOption } from 'ngx-burst/radio';
import { NgxbToggleComponent } from "ngx-burst/toggle";
import { NgxbTooltipDirective, NgxbTooltipPosition } from 'ngx-burst/tooltip';
import { ExampleDialogComponent } from './example-dialog/example-dialog.component';

@Component({
    selector: 'app-root',
    styleUrl: './app.component.scss',
    templateUrl: './app.component.html',
    imports: [
        FormsModule,
        NgxbAccordionContentDirective,
        NgxbAccordionGroupDirective,
        NgxbAccordionHeaderDirective,
        NgxbButtonDirective,
        NgxbCheckboxComponent,
        NgxbMenuContentDirective,
        NgxbMenuDirective,
        NgxbMenuItemDirective,
        NgxbRadioGroupComponent,
        NgxbToggleComponent,
        NgxbTooltipDirective
    ]
})
export class AppComponent {
    public accordionFullCollapsible = true;
    public accordionMultiExpandable = false;
    public checkboxDisabledValue = true;
    public dialogSize = NgxbDialogSize.minimal;
    public menuPosition = NgxbMenuPosition.topStart;
    public menuWidth = NgxbMenuWidth.auto;
    public radioOptions: RadioOption[] = [
        { label: 'First option', value: 'first' },
        { label: 'Second option', value: 'second' },
        { label: 'Third option', value: 'third' }
    ];
    public tooltipEnabled = false;

    public ButtonType = NgxbButtonType;
    public DialogSize = NgxbDialogSize;
    public MenuPosition = NgxbMenuPosition;
    public MenuWidth = NgxbMenuWidth;
    public TooltipPosition = NgxbTooltipPosition;

    private _dialogService = inject(NgxbDialogService);

    public dialogSizeChange(event: Event): void {
        this.dialogSize = parseInt((<HTMLSelectElement>(event.target)).value);
    }

    public openDialog(): void {
        const dialogRef = this._dialogService.show(ExampleDialogComponent, this.dialogSize);
        if (dialogRef) {
            dialogRef.instance.closeCallback = () => {
                console.log('Dialog closed');
            }
        }
    }

    public menuPositionChange(event: Event): void {
        this.menuPosition = parseInt((<HTMLSelectElement>(event.target)).value);
    }

    public menuWidthChange(event: Event): void {
        this.menuWidth = <NgxbMenuWidth>(<HTMLSelectElement>(event.target)).value;
    }
}
