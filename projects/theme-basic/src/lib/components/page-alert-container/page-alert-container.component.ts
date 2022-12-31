/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ViewEncapsulation } from '@angular/core';
import { PageAlertService } from '@abp/ng.theme.shared';

@Component({
  selector: 'abp-page-alert-container',
  templateUrl: './page-alert-container.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PageAlertContainerComponent {
  constructor(public service: PageAlertService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
