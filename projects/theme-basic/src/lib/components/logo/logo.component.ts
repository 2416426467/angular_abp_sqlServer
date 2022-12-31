/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */

import { ApplicationInfo, EnvironmentService } from '@abp/ng.core'; 
import { Component } from '@angular/core';
import { StyleSettingService } from '../../services/style-setting.service';

@Component({
  selector: 'abp-logo',
  template: `
  <!-- [ngStyle]="{'color':CustomStyle[styleSetting.styleType].color||''}" -->
  <!-- logo -->
    <a class="navbar-brand" routerLink="/"  >
      <ng-container *ngIf="appInfo.logoUrl; else appName">
        <img [src]="appInfo.logoUrl" [alt]="appInfo.name" width="40px" height="auto" />
        {{ appInfo.name }}
      </ng-container>
    </a>
    <ng-template #appName>
      {{ appInfo.name }}
    </ng-template>
  `,
})
export class LogoComponent {
  get appInfo(): ApplicationInfo {
    return this.environment.getEnvironment().application;
  }


  constructor(private environment: EnvironmentService, private StyleSetting: StyleSettingService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // console.log(this.styleSetting, '测试', this.CustomStyle,1111,this.CustomStyle[this.styleSetting.styleType]?.color);
  }
}
