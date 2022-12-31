/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { eLayoutType, SubscriptionService, EnvironmentService } from '@abp/ng.core';
import { collapseWithMargin, slideFromBottom } from '@abp/ng.theme.shared';
import { AfterViewInit, Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { StyleSettingService } from '../../services/style-setting.service';

import { DomInsertionService, CONTENT_STRATEGY } from '@abp/ng.core';

@Component({
  selector: 'abp-layout-application',
  templateUrl: './application-layout.component.html',
  styleUrls: ['./application-layout.component.scss', '../colour.scss'],
  animations: [slideFromBottom, collapseWithMargin],
  providers: [LayoutService, SubscriptionService],
})
export class ApplicationLayoutComponent implements AfterViewInit {
  // required for dynamic component
  static type = eLayoutType.application;
  setwidth1: string = '73px';
  setwidth2: string = '240px';

  issideicon: boolean = false; //侧边栏是否只显示图标
  iswidebar: boolean = true;//是否显示宽侧边栏
  StyleControl: string = this.StyleSetting.getstoragestyle(); //主题样式
  private styleElement: HTMLStyleElement; //样式

  constructor(
    public service: LayoutService,
    private Environment: EnvironmentService,
    private StyleSetting: StyleSettingService,
    private domInsertionService: DomInsertionService
  ) {}

  ngAfterViewInit() {
    this.service.subscribeWindowSize();
  }
  ngOnInit(): void {
    this.setbodyattr();
  }

  /* 侧边栏控制按钮的点击事件
    issmallScreen
      true:小屏幕
      false：大屏幕
  */
  sidebartoggle(issmallScreen: any, drawertog: any) {
    if (issmallScreen) {
      drawertog.toggle();
      return;
    }
    if (this.issideicon == false) {
      this.issideicon = true;
      this.iswidebar = false;
    } else {
      this.issideicon = false;
      this.iswidebar = true;
    }
  }
  bindiswidebar(){
    console.log('bindiswidebar')
  }

  /* 修改主题 */
  bindchoosestyle(choosestyle: any) {
    this.StyleControl = choosestyle.stylename;
    this.setbodyattr();
  }

  setbodyattr() {
    document.body.setAttribute('styles', this.StyleControl);
  }
  /* 切换侧边栏 */
  togglebarnav(drawertog: any) {
    drawertog.toggle();
  }
}
