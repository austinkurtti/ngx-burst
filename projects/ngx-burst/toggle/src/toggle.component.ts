import { Component, EventEmitter, inject, input, model, OnInit, Output } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck as fasCheck, faQuestionCircle as fasQuestionCircle, faXmark as fasXmark } from '@fortawesome/free-solid-svg-icons';
import { NgxbTooltipDirective } from 'ngx-burst/tooltip';

@Component({
    selector: 'ngxb-toggle',
    templateUrl: './toggle.component.html',
    host: {
        '[class.disabled]': 'disabled()',
        '[style.display]': '"block"'
    },
    imports: [
        FontAwesomeModule,
        NgxbTooltipDirective
    ]
})
export class NgxbToggleComponent implements OnInit {
    public value = model(false);
    public label = input('');
    public description = input('');
    public descriptionAsTooltip = input(false);
    public disabled = input(false);

    @Output() valueChange = new EventEmitter<boolean>();

    private _iconLib = inject(FaIconLibrary);

    private _id: string = '';

    public get id(): string {
        return this._id;
    }

    public ngOnInit(): void {
        this._id = crypto.randomUUID().toString();

        this._iconLib.addIcons(fasCheck, fasQuestionCircle, fasXmark);
    }

    public toggle(): void {
        if (!this.disabled()) {
            this.value.set(!this.value());
            this.valueChange.emit(this.value());
        }
    }
}
