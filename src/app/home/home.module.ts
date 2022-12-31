

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ConfigStateService } from '@abp/ng.core';
/*  */
import { ComponentsModule } from "../../../projects/components/src/public-api";


@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRoutingModule,ComponentsModule],
})
export class HomeModule {

}
