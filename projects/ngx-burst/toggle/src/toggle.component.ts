import { Component, EventEmitter, input, model, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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

    private _id: string = '';

    public get id(): string {
        return this._id;
    }

    public ngOnInit(): void {
        this._id = crypto.randomUUID().toString();
    }

    public toggle(): void {
        if (!this.disabled()) {
            this.value.set(!this.value());
            this.valueChange.emit(this.value());
        }
    }
}
