import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatIcon } from '@angular/material/icon'
import { Platform } from '@angular/cdk/platform'

const body: string = encodeURIComponent(
    'Me gustaría saber más sobre el programa de ESL.'
)

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MatIcon],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    iosLink = `https://maps.apple.com/?address=939%20S%20Third%20St,%20Mebane,%20NC%20%2027302,%20United%20States&auid=9617755614119622727&ll=36.084097,-79.277507&lsp=9902&q=Grace%20Reformed%20Baptist%20Church&t=r`
    otherLink =
        'https://www.google.com/maps/place/Grace+Reformed+Baptist+Church/@36.0840764,-79.2800624,17z/data=!3m1!4b1!4m6!3m5!1s0x89acd6881d6dddd9:0xd9256638f037e904!8m2!3d36.0840764!4d-79.2774875!16s%2Fg%2F1tggbvg5?entry=ttu'

    constructor(private readonly platform: Platform) {}

    openMaps() {
        let url = this.platform.IOS ? this.iosLink : this.otherLink
        window.open(url, '_blank')
    }

    openMail() {
        window.open(
            `mailto:esl@grbc.com?subject=ESL%20Program%20Inquiry&body=${body}`,
            '_blank'
        )
    }
}
