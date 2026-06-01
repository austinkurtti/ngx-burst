import { Component, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxbButtonDirective } from 'ngx-burst/button';
import { NgxbMenuContentDirective, NgxbMenuDirective, NgxbMenuItemDirective, NgxbMenuWidth } from 'ngx-burst/menu';
import { NgxbSelectOption } from './select-option';

@Component({
    selector: 'ngxb-select',
    templateUrl: './select.component.html',
    host: {
        '[class.disabled]': 'disabled()'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxbSelectComponent),
            multi: true
        }
    ],
    imports: [
        FontAwesomeModule,
        NgxbButtonDirective,
        NgxbMenuContentDirective,
        NgxbMenuDirective,
        NgxbMenuItemDirective
    ]
})
export class NgxbSelectComponent implements ControlValueAccessor {
    public inputId = input.required<string>();
    public label = input('');
    public placeholder = input('');
    public options = input<NgxbSelectOption<any>[]>([]);
    public disabled = model(false);
    
    public selectedOption = signal<NgxbSelectOption<any> | null>(null);
    public menuWidth = NgxbMenuWidth.matchParent;
    public value: any;

    public onChange = (value: any) => {};
    public onTouched = () => {};

    public optionClick(opt: NgxbSelectOption<any>) {
        if (this.selectedOption()?.value === opt.value) {
            this.selectedOption.set(null);
            this.onChange(null);
        } else {
            this.selectedOption.set(opt);
            this.onChange(opt.value);
        }
    }

    public writeValue(value: any): void {
        const selectedOption = this.options().find(o => o.value === value);
        if (selectedOption === undefined) {
            this.value = null;
            this.selectedOption.set(null);
        } else {
            this.value = value;
            this.selectedOption.set(selectedOption!);
        }
    }

    public registerOnChange(fn: (value: any) => {}): void {
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
