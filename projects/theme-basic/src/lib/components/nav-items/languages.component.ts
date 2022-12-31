/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { ConfigStateService, LanguageInfo, SessionStateService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'abp-languages',
  // template: `
    
  // `,
   templateUrl: './languages.component.html',
   styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent {
  get smallScreen(): boolean {
    return window.innerWidth < 992;
  }

  languages$: Observable<LanguageInfo[]> = this.configState.getDeep$('localization.languages');

  get defaultLanguage$(): Observable<string> {
    return this.languages$.pipe(
      map(
        languages =>
          languages?.find(lang => lang.cultureName === this.selectedLangCulture)?.displayName || '',
      ),
    );
  }

  get dropdownLanguages$(): Observable<LanguageInfo[]> {
    return this.languages$.pipe(
      map(
        languages => languages?.filter(lang => lang.cultureName !== this.selectedLangCulture) || [],
      ),
    );
  }

  get selectedLangCulture(): string {
    return this.sessionState.getLanguage();
  }

  constructor(private sessionState: SessionStateService, private configState: ConfigStateService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  onChangeLang(cultureName: string) {
    this.sessionState.setLanguage(cultureName);
  }
}
