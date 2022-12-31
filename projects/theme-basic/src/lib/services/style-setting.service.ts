/* eslint-disable @angular-eslint/contextual-lifecycle */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Injectable } from '@angular/core';
import { ApplicationInfo, EnvironmentService } from '@abp/ng.core';


@Injectable({
  providedIn: 'root',
})
export class StyleSettingService {
  systemstyles: string = 'white';
  stylesLIst: any[] = [
    {
      stylename: 'Light',
      icon:'wb_sunny',
      selcolor:'#ffd740',
    },
    {
      stylename: 'Semi-Dark',
      icon:'wb_twighlight',
      selcolor:'#292D32',
    },
    {
      stylename:'Indigo',
      icon:'invert_colors',
      selcolor:'#3f51b5',
    },
    {
      stylename:'Deep-Purple',
      icon:'motion_photos_on',
      selcolor:'#673ab7',
    },
  ];

  // localStorage.setItem("sitename", "菜鸟教程");
  constructor(private environment: EnvironmentService) {}
// 获取缓存主题
  getstoragestyle() {
    if (localStorage.getItem('systemstyles')) {
      return localStorage.getItem('systemstyles');
    }
    localStorage.setItem('systemstyles', this.systemstyles);
    return this.systemstyles;
  }
  /* 获取主题列表 */
  getstylesList(){
    return this.stylesLIst
  }
  /* 选择主题 */
  setstyle(styleitem:any){
    this.systemstyles=styleitem.stylename
    localStorage.setItem('systemstyles', styleitem.stylename);
  }
}
