/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { eLayoutType } from '@abp/ng.core';

@Component({
  selector: 'abp-layout-empty',
  template: `
    <router-outlet></router-outlet>
    <abp-confirmation></abp-confirmation>
  `,
})
export class EmptyLayoutComponent {
  static type = eLayoutType.empty;
}
