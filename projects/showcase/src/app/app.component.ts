import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { NgxbAccordionContentDirective, NgxbAccordionGroupDirective, NgxbAccordionHeaderDirective } from 'ngx-burst/accordion';
import { NgxbButtonDirective, NgxbButtonType } from 'ngx-burst/button';
import { NgxbCheckboxComponent } from 'ngx-burst/checkbox';
import { NgxbDialogService, NgxbDialogSize } from 'ngx-burst/dialog';
import { NgxbMenuContentDirective, NgxbMenuDirective, NgxbMenuItemDirective, NgxbMenuPosition, NgxbMenuWidth } from 'ngx-burst/menu';
import { NgxbRadioGroupComponent, NgxbRadioOption } from 'ngx-burst/radio';
import { NgxbSelectComponent, NgxbSelectOption } from 'ngx-burst/select';
import { NgxbTextComponent } from 'ngx-burst/text';
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
        NgxbSelectComponent,
        NgxbTextComponent,
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
    public radioOptions: NgxbRadioOption[] = [
        { label: 'First option', value: 'first' },
        { label: 'Second option', value: 'second' },
        { label: 'Third option', value: 'third' }
    ];
    public radioDisabledValue = 'second';
    public selectOptions: NgxbSelectOption<string>[] = [
        { label: 'First option', value: 'first' },
        { label: 'Second option', value: 'second' },
        { label: 'Third option', value: 'third' }
    ];
    public selectDisabledValue = 'third';
    public textValue = 'Lorem ipsum';
    public tooltipEnabled = false;

    public ButtonType = NgxbButtonType;
    public DialogSize = NgxbDialogSize;
    public MenuPosition = NgxbMenuPosition;
    public MenuWidth = NgxbMenuWidth;
    public TooltipPosition = NgxbTooltipPosition;

    private _dialogService = inject(NgxbDialogService);
    private _iconLib = inject(FaIconLibrary);

    public ngOnInit(): void {
        this._iconLib.addIcons(faTriangleExclamation);
    }

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

    public alert(message: string) {
        window.alert(message);
    }
}
