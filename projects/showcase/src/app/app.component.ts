import { Component } from '@angular/core';
import { BstTooltipDirective } from 'ngx-burst/tooltip';

@Component({
    selector: 'app-root',
    styleUrl: './app.component.scss',
    templateUrl: './app.component.html',
    imports: [
        BstTooltipDirective
    ]
})
export class AppComponent {}
