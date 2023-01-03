import { AccountConfigModule } from '@abp/ng.account/config';
import { CoreModule } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IdentityConfigModule } from '../../projects/identity/config/src/identity-config.module';
// import { IdentityConfigModule } from '@abp/ng.identity/config';

import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';

import { ThemeBasicModule } from '../../projects/theme-basic/src/lib/theme-basic.module';
// import { ThemeBasicModule } from 'theme-basic';
// import { ThemeBasicModule } from '@dignite-ng/theme-basic';
// import { ThemeBasicModule } from '@abp/ng.theme.basic';

import { ComponentsModule } from '../../projects/components/src/public-api';

import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';
import { StudyComponent } from './study/study.component';
/* materail */
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),
    ThemeSharedModule.forRoot(),
    AccountConfigModule.forRoot(),
    IdentityConfigModule.forRoot(),
    TenantManagementConfigModule.forRoot(),
    SettingManagementConfigModule.forRoot(),
    ThemeBasicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatIconModule
  ],
  declarations: [AppComponent, StudyComponent],
  providers: [APP_ROUTE_PROVIDER],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
