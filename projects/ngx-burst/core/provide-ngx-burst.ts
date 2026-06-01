import { inject, provideAppInitializer } from '@angular/core';
import { NgxbInitService } from './init.service';

export function provideNgxBurst() {
    return [
        NgxbInitService,
        provideAppInitializer(() => {
            const initService = inject(NgxbInitService);
            initService.init();
        })
    ];
}
