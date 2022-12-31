import { NgModule } from '@angular/core';
import { ComponentsComponent } from './components.component';
import { CoreModule, LazyModuleFactory } from '@abp/ng.core';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

// materail 引入
import {MatTableModule} from '@angular/material/table';//表格
import { MatMenuModule } from '@angular/material/menu';//菜单
import {MatPaginatorModule} from '@angular/material/paginator';//分页器
import {MatIconModule} from '@angular/material/icon';//图标
import {MatButtonModule} from '@angular/material/button';//按钮
import {MatCheckboxModule} from '@angular/material/checkbox';//复选框
import {MatTooltipModule} from '@angular/material/tooltip';//提示工具
import {MatDialogModule} from '@angular/material/dialog';//对话框
import {MatRadioModule} from '@angular/material/radio';//单选按钮
import {MatSortModule} from '@angular/material/sort';
import {MatTreeModule} from '@angular/material/tree';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';//快餐栏
/* 组件 */
import { ModalsComponent } from './component/modals/modals.component';//模态框
import { DynamicFormComponent } from './component/dynamic-form/dynamic-form.component';//对话框组件
import { TableComponent } from './component/table/table.component';//表格
import { PermissionManagementComponent } from './component/permission-management/permission-management.component';
import { TreeComponent } from './component/tree/tree.component';
import { AddMinusFormComponent } from './component/add-minus-form/add-minus-form.component';
import { SnackBarComponent } from './component/snack-bar/snack-bar.component';


const declarationsWithExports=[
  ModalsComponent,
  TableComponent,
  DynamicFormComponent,
  PermissionManagementComponent,
  TreeComponent,
  AddMinusFormComponent,
  SnackBarComponent
]


@NgModule({
  declarations: [
    ComponentsComponent,
    ...declarationsWithExports,
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CoreModule, 
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    MatRadioModule,
    MatTreeModule,
    // MatSortModule,
    MatSelectModule,
  ],
  exports: [
    ComponentsComponent,
    ...declarationsWithExports,
  ]
})
export class ComponentsModule { }
