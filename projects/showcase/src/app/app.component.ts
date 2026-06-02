import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxbAccordionContentDirective, NgxbAccordionGroupDirective, NgxbAccordionHeaderDirective } from '@austinkurtti/ngx-burst/accordion';
import { NgxbButtonDirective, NgxbButtonType } from '@austinkurtti/ngx-burst/button';
import { NgxbCheckboxComponent } from '@austinkurtti/ngx-burst/checkbox';
import { NgxbDialogOpenerDirective, NgxbDialogService, NgxbDialogSize } from '@austinkurtti/ngx-burst/dialog';
import { NgxbMenuContentDirective, NgxbMenuDirective, NgxbMenuItemDirective, NgxbMenuPosition, NgxbMenuWidth } from '@austinkurtti/ngx-burst/menu';
import { NgxbRadioGroupComponent, NgxbRadioOption } from '@austinkurtti/ngx-burst/radio';
import { NgxbSelectComponent, NgxbSelectOption } from '@austinkurtti/ngx-burst/select';
import { NgxbTextComponent } from '@austinkurtti/ngx-burst/text';
import { NgxbToggleComponent } from '@austinkurtti/ngx-burst/toggle';
import { NgxbTooltipDirective, NgxbTooltipPosition } from '@austinkurtti/ngx-burst/tooltip';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
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
        NgxbDialogOpenerDirective,
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
    public dialogSizeOptions: NgxbSelectOption<NgxbDialogSize>[] = [
        { label: 'Minimal', value: NgxbDialogSize.minimal },
        { label: 'Small', value: NgxbDialogSize.small },
        { label: 'Medium', value: NgxbDialogSize.medium },
        { label: 'Large', value: NgxbDialogSize.large },
        { label: 'Fullscreen', value: NgxbDialogSize.fullscreen }
    ];
    public menuPosition = NgxbMenuPosition.topStart;
    public menuPositionOptions: NgxbSelectOption<NgxbMenuPosition>[] = [
        { label: 'Top Start', value: NgxbMenuPosition.topStart },
        { label: 'Top End', value: NgxbMenuPosition.topEnd },
        { label: 'Bottom Start', value: NgxbMenuPosition.bottomStart },
        { label: 'Bottom End', value: NgxbMenuPosition.bottomEnd }
    ];
    public menuWidth = NgxbMenuWidth.auto;
    public menuWidthOptions: NgxbSelectOption<NgxbMenuWidth>[] = [
        { label: 'Auto', value: NgxbMenuWidth.auto },
        { label: 'Match Parent', value: NgxbMenuWidth.matchParent },
        { label: 'Full', value: NgxbMenuWidth.full },
        { label: 'Three Quarters', value: NgxbMenuWidth.threeQuarters },
        { label: 'Half', value: NgxbMenuWidth.half },
        { label: 'Third', value: NgxbMenuWidth.third },
        { label: 'Quarter', value: NgxbMenuWidth.quarter }
    ];
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

    public openDialog = (): void => {
        const dialogRef = this._dialogService.show(ExampleDialogComponent, this.dialogSize);
        if (dialogRef) {
            dialogRef.instance.closeCallback = () => {
                console.log('closeCallback - Dialog closed');
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
