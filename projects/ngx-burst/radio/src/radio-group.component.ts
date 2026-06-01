import { Component, forwardRef, inject, input, model, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle as farCircle, faCircleDot as farCircleDot } from '@fortawesome/free-regular-svg-icons';
import { RadioOption } from './radio-option';

@Component({
    selector: 'ngxb-radio-group',
    templateUrl: './radio-group.component.html',
    host: {
        '[class.vertical]': 'vertical()'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxbRadioGroupComponent),
            multi: true
        }
    ],
    imports: [
        FontAwesomeModule
    ]
})
export class NgxbRadioGroupComponent implements OnInit, ControlValueAccessor {
    public name = input.required();
    public options = input.required<RadioOption[]>();
    public label = input('');
    public vertical = input(false);
    public disabled = model(false);

    public selectedValue: string | null = null;
    public onChange = (value: string) => {};
    public onTouched = () => {};

    private _iconLib = inject(FaIconLibrary);

    public ngOnInit(): void {
        this._iconLib.addIcons(farCircle, farCircleDot);
    }

    public selectOption(value: string): void {
        if (this.disabled()) {
            return;
        }

        this.selectedValue = value;
        this.onChange(value);
        this.onTouched();
    }

    public writeValue(value: string): void {
        this.selectedValue = value;
    }

    public registerOnChange(fn: (value: string) => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        // TODO - this might need to change
        // Blend manual state with Angular Form state
        this.disabled.set(isDisabled);
    }
}
