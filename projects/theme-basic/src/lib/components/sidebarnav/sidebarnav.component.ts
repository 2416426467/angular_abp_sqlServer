/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { eLayoutType, SubscriptionService, EnvironmentService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'lib-sidebarnav',
  templateUrl: './sidebarnav.component.html',
  styleUrls: ['./sidebarnav.component.scss'],
  providers: [LayoutService,SubscriptionService],
})
export class SidebarnavComponent implements OnInit {
  showFiller = true;
  constructor(
    public Service:LayoutService
  ) { }
  ngAfterViewInit() {
    this.Service.subscribeWindowSize();
    console.log(this.Service.smallScreen,121212)
  }
  ngOnInit(): void {
   
  }

}
