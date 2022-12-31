/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { NavItem, NavItemsService } from '@abp/ng.theme.shared';
import { Component, Input, Output,EventEmitter,TrackByFunction } from '@angular/core';
import { StyleSettingService } from '../../services/style-setting.service';

@Component({
  selector: 'abp-nav-items',
  templateUrl: 'nav-items.component.html',
  styleUrls: ['./nav-items.component.scss'],
})
export class NavItemsComponent {
  trackByFn: TrackByFunction<NavItem> = (_, element) => element.id;
  @Input() StyleControltype:any
  @Output() choosestyle = new EventEmitter();
  styleList:any[]=this.StyleSetting.getstylesList();

  constructor(public readonly navItems: NavItemsService,private StyleSetting:StyleSettingService) {}
  ngOnInit(): void {
  }
  /* 选择主题 */
  bindchoosestyle(items:any){
    this.StyleSetting.setstyle(items)
    this.choosestyle.emit(items);
  }





}
