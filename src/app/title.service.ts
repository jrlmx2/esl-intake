import { Injectable, OnDestroy } from '@angular/core'
import { Title } from '@angular/platform-browser'
import {
    NavigationEnd,
    Router,
    RouterStateSnapshot,
    TitleStrategy
} from '@angular/router'
import { GoogleTagManagerService } from 'angular-google-tag-manager'
import { filter, Subscription } from 'rxjs'
import { environment } from './environment'

declare var gtag: any

@Injectable({
    providedIn: 'root'
})
export class TitleService extends TitleStrategy implements OnDestroy {
    subHandle: Subscription

    constructor(
        private title: Title,
        private gtm: GoogleTagManagerService,
        router: Router
    ) {
        super()

        this.subHandle = router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => {
                gtag('config', environment.gtag, {
                    page_path: e.urlAfterRedirects
                })
            })
    }

    updateTitle(snapshot: RouterStateSnapshot): void {
        const title = this.buildTitle(snapshot)
        if (title !== undefined) {
            this.title.setTitle(title)
        }
    }

    ngOnDestroy(): void {
        if (this.subHandle) {
            this.subHandle.unsubscribe()
        }
    }
}
