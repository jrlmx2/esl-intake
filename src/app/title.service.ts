import { Injectable } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { RouterStateSnapshot, TitleStrategy } from '@angular/router'
import { GoogleTagManagerService } from 'angular-google-tag-manager'

@Injectable({
    providedIn: 'root'
})
export class TitleService extends TitleStrategy {
    constructor(
        private title: Title,
        private gtm: GoogleTagManagerService
    ) {
        super()
    }

    updateTitle(snapshot: RouterStateSnapshot): void {
        const title = this.buildTitle(snapshot)
        if (title !== undefined) {
            this.title.setTitle(title)
            this.gtm
                .pushTag({
                    event: 'page',
                    pageName: snapshot.url
                })
                .then()
        }
    }
}
