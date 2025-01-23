import { Component } from '@angular/core';
import { NgxbTooltipDirective, TooltipPosition } from 'ngx-burst/tooltip';

@Component({
    selector: 'app-root',
    styleUrl: './app.component.scss',
    templateUrl: './app.component.html',
    imports: [
        NgxbTooltipDirective
    ]
})
export class AppComponent {
    public TooltipPosition = TooltipPosition;

    public tooltipEnabled = true;
}
