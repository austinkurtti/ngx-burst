import { inject, Injectable } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCircle as farCircle, faCircleDot as farCircleDot, faSquare as farSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheck as fasCheck, faCheckSquare as fasCheckSquare, faQuestionCircle as fasQuestionCircle, faXmark as fasXmark } from '@fortawesome/free-solid-svg-icons';

@Injectable({
    providedIn: 'root'
})
export class NgxbInitService {
    private _iconLib = inject(FaIconLibrary);

    public init() {
        this._iconLib.addIcons(
            // Regular
            farCircle,
            farCircleDot,
            farSquare,

            // Solid
            fasCheck,
            fasCheckSquare,
            fasQuestionCircle,
            fasXmark
        );
    }
}
