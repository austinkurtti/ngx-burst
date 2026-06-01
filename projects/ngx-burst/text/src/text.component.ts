import { Component, forwardRef, input, model, output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NgxbButtonDirective, NgxbButtonType } from 'ngx-burst/button';
import { NgxbTooltipDirective } from 'ngx-burst/tooltip';

@Component({
    selector: 'ngxb-text',
    templateUrl: './text.component.html',
    host: {
        '[class.disabled]': 'disabled()',
        '[class.with-button]': '!!buttonIcon()'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxbTextComponent),
            multi: true
        }
    ],
    imports: [
        FontAwesomeModule,
        FormsModule,
        NgxbButtonDirective,
        NgxbTooltipDirective
    ]
})
export class NgxbTextComponent implements ControlValueAccessor {
    public buttonIcon = input<IconProp | undefined>();
    public buttonTooltip = input('');
    public inputId = input.required<string>();
    public label = input('');
    public placeholder = input('');
    public minLength = input(0);
    public maxLength = input(100);
    public disabled = model(false);

    public buttonClick = output();

    public value = '';
    public buttonType = NgxbButtonType.subtle;
    public onChange = (value: string) => {};
    public onTouched = () => {};


    public onInput(event: Event) {
        const inputEl = event.target as HTMLInputElement;
        this.value = inputEl.value;
        this.onChange(this.value);
    }

    public writeValue(value: string): void {
        this.value = value;
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
