import { Component, forwardRef, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquare as farSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare as fasCheckSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'ngxb-checkbox',
    templateUrl: './checkbox.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxbCheckboxComponent),
            multi: true
        }
    ],
    imports: [
        FontAwesomeModule
    ]
})
export class NgxbCheckboxComponent implements ControlValueAccessor {
    public disabled = model(false);

    public checked = false;
    public onChange = (value: boolean) => {};
    public onTouched = () => {};

    constructor(iconLib: FaIconLibrary) {
        iconLib.addIcons(farSquare, fasCheckSquare);
    }

    public toggleCheck(): void {
        if (this.disabled()) {
            return;
        }

        this.checked = !this.checked;
        this.onChange(this.checked);
        this.onTouched();
    }

    public writeValue(value: boolean): void {
        this.checked = value;
    }

    public registerOnChange(fn: (value: boolean) => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        // Blend manual state with Angular Form state
        this.disabled.set(isDisabled);
    }
}
