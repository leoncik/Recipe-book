import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
    private userSubscription!: Subscription;

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }
}
