import { RoutesService, eLayoutType, ABP } from '@abp/ng.core';
import { eThemeSharedRouteNames } from '@abp/ng.theme.shared';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/Study',
        name: 'Study',
        iconClass: 'fas fa-graduation-cap',
        order: 2,
        layout: eLayoutType.application,
      },
    ]);

    // // 将目录移入管理
    // const newHomeRouteConfig: Partial<ABP.Route> = {
    //   iconClass: 'fas fa-home',
    //   parentName: eThemeSharedRouteNames.Administration,
    //   order: 0,
    // };
    // routesService.patch('Study', newHomeRouteConfig);

      // 给目录添加子目录
      // const dashboardRouteConfig: ABP.Route = {
      //   path: '/Study',
      //   name: '::Menu:Dashboard',
      //   parentName: 'Study',
      //   order: 1,
      //   iconClass: 'fas fa-graduation-cap',
      //   layout: eLayoutType.application,
      // };

      // routesService.add([dashboardRouteConfig]);
      // const dashboardRouteConfigss: ABP.Route[] = [{
      //   path: '/Study',
      //   name: 'sssssss',
      //   parentName: '::Menu:Dashboard',
      //   iconClass: 'fas fa-graduation-cap',
      //   order: 1,
      //   layout: eLayoutType.application,
      // },{
      //   path: '/Study',
      //   name: '1111',
      //   parentName: 'sssssss',
      //   order: 1,
      //   layout: eLayoutType.application,
      // }];

      // routesService.add(dashboardRouteConfigss);
    // //  移除某个目录
    //   routesService.remove(['::Menu:Dashboard']);
  };
}
