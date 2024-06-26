import { ApplicationConfig, Injectable } from '@angular/core';
import {provideRouter, RouterStateSnapshot, TitleStrategy, withComponentInputBinding} from '@angular/router';

import { provideClientHydration, Title } from '@angular/platform-browser';
import { routes } from "./app.routes";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";



@Injectable({
  providedIn: 'root'
})
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly domTitle: Title) {
    super();
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.domTitle.setTitle(`GRBC ESL | ${title}`);
    }
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy}, provideAnimationsAsync(),
  ]
};
