import {
  AuthGuard, PermissionGuard,
  ReplaceableComponents,
  ReplaceableRouteContainerComponent, RouterOutletComponent
} from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { RolesComponent } from './components/roles/roles.component';
// import { UsersComponent } from './components/users/users.component';
import { OrganizationUnitsComponent } from './components/organization-units/organization-units.component';
import { eIdentityComponents } from './enums/components';
import { IdentityExtensionsGuard } from './guards/extensions.guard';
import { RolesroleschooseComponent } from './components/roles/roleschoose.component';
import { ClaimTypesComponent } from './components/claim-types/claim-types.component';
import { UsersmaterailComponent } from './components/users/usersmaterail.component';

const routes: Routes = [
  { path: '', redirectTo: 'roles', pathMatch: 'full' },
  {
    path: '',
    component: RouterOutletComponent,
    canActivate: [AuthGuard, PermissionGuard, IdentityExtensionsGuard],
    children: [
      {
        path: 'roles',
        component: ReplaceableRouteContainerComponent,
        data: {
          requiredPolicy: 'AbpIdentity.Roles',
          replaceableComponent: {
            key: eIdentityComponents.Roles,
            defaultComponent: RolesroleschooseComponent,
          } as ReplaceableComponents.RouteData<RolesroleschooseComponent>,
        },
      },
      // RolesComponent
      // RolesroleschooseComponent
      {
        path: 'users',
        component: ReplaceableRouteContainerComponent,
        data: {
          requiredPolicy: 'AbpIdentity.Users',
          replaceableComponent: {
            key: eIdentityComponents.Users,
            defaultComponent: UsersmaterailComponent,
          } as ReplaceableComponents.RouteData<UsersmaterailComponent>,
        },
      },
      // UsersComponent
      // UsersmaterailComponent
      {
        path: 'Organization-Units',
        component: ReplaceableRouteContainerComponent,
        data: {
          requiredPolicy: 'AbpIdentity.OrganizationUnits',
          replaceableComponent: {
            key: eIdentityComponents.OrganizationUnits,
            defaultComponent: OrganizationUnitsComponent,
          } as ReplaceableComponents.RouteData<OrganizationUnitsComponent>,
        },
      },
      {
        path: 'ClaimTypes',
        component: ReplaceableRouteContainerComponent,
        data: {
          requiredPolicy: 'AbpIdentity.ClaimTypes',
          replaceableComponent: {
            key: eIdentityComponents.ClaimTypes,
            defaultComponent: ClaimTypesComponent,
          } as ReplaceableComponents.RouteData<ClaimTypesComponent>,
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentityRoutingModule { }
