import { CoreModule, LazyModuleFactory } from '@abp/ng.core';
import { PermissionManagementModule } from '@abp/ng.permission-management';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { UiExtensionsModule } from '@abp/ng.theme.shared/extensions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModuleWithProviders, NgModule, NgModuleFactory } from '@angular/core';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
// import { RolesComponent } from './components/roles/roles.component';
import { RolesroleschooseComponent } from './components/roles/roleschoose.component';
import { UsersComponent } from './components/users/users.component';
import { IdentityExtensionsGuard } from './guards/extensions.guard';
import { IdentityRoutingModule } from './identity-routing.module';
import { IdentityConfigOptions } from './models/config-options';
import {
  IDENTITY_CREATE_FORM_PROP_CONTRIBUTORS,
  IDENTITY_EDIT_FORM_PROP_CONTRIBUTORS,
  IDENTITY_ENTITY_ACTION_CONTRIBUTORS,
  IDENTITY_ENTITY_PROP_CONTRIBUTORS,
  IDENTITY_TOOLBAR_ACTION_CONTRIBUTORS,
} from './tokens/extensions.token';
import {
  OrganizationUnitsComponent,
} from './components/organization-units/organization-units.component';
import { ClaimTypesComponent } from './components/claim-types/claim-types.component';


/* 挎包引入需更新链接 */
import { ComponentsModule } from '../../../components/src/lib/components.module';
/* material */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from '@angular/cdk/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';//提示工具
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import { UsersmaterailComponent } from './components/users/usersmaterail.component';
import {MatTabsModule} from '@angular/material/tabs';//选项卡
// import { UppercasePipe } from './uppercase.pipe';



@NgModule({

  declarations: [
    RolesroleschooseComponent,
    // RolesComponent,
    UsersComponent,
    OrganizationUnitsComponent,
    ClaimTypesComponent,
    UsersmaterailComponent,
    // UppercasePipe,
    // PagealertComponent,
    // TableComponent,
  ],
  exports: [
    // RolesComponent, 
    UsersComponent
  ],
  imports: [
    
    ComponentsModule,//通用组件
    CoreModule,
    IdentityRoutingModule,
    NgbNavModule,
    ThemeSharedModule,
    UiExtensionsModule,
    NgbDropdownModule,
    PermissionManagementModule,
    NgxValidateCoreModule,
    MatButtonModule,
    MatIconModule,
    CdkTreeModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatListModule,
    MatMenuModule,
    DragDropModule,
    DialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatTreeModule,
    MatSnackBarModule,
    MatTooltipModule,
    FormsModule, 
    ReactiveFormsModule ,
    MatSortModule,
    MatSelectModule,
    MatTabsModule,
  ],
})
export class IdentityModule {
  static forChild(options: IdentityConfigOptions = {}): ModuleWithProviders<IdentityModule> {
    return {
      ngModule: IdentityModule,
      providers: [
        {
          provide: IDENTITY_ENTITY_ACTION_CONTRIBUTORS,
          useValue: options.entityActionContributors,
        },
        {
          provide: IDENTITY_TOOLBAR_ACTION_CONTRIBUTORS,
          useValue: options.toolbarActionContributors,
        },
        {
          provide: IDENTITY_ENTITY_PROP_CONTRIBUTORS,
          useValue: options.entityPropContributors,
        },
        {
          provide: IDENTITY_CREATE_FORM_PROP_CONTRIBUTORS,
          useValue: options.createFormPropContributors,
        },
        {
          provide: IDENTITY_EDIT_FORM_PROP_CONTRIBUTORS,
          useValue: options.editFormPropContributors,
        },
        IdentityExtensionsGuard,
      ],
    };
  }

  static forLazy(options: IdentityConfigOptions = {}): NgModuleFactory<IdentityModule> {
    return new LazyModuleFactory(IdentityModule.forChild(options));
  }
}
