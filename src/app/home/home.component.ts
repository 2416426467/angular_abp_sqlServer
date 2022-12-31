/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ConfirmationService } from '@abp/ng.theme.shared';
import { ConfigStateService } from '@abp/ng.core';

// 
import { ComponentsModule } from "../../../projects/components/src/public-api";
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { dynamicform } from '../../../projects/components/src/lib/interface/index';
import { OrganizationUnitService } from 'projects/identity/proxys/dignite/abp/identity';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  get hasLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  constructor(
    private oAuthService: OAuthService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private Config: ConfigStateService,
    private fb: FormBuilder,
    private FormsModule: FormsModule,
    private UnitService: OrganizationUnitService
  ) { }
  //表单数据
  formdata: dynamicform[] = [{
    type: 'TreeSelect',
    name: 'TreeSelect',
    diaplayname: 'Tree搜索',
    isrequired: true,//是否必填
    placeholder: '', //文本提示
    isdelectbtn: true,//是否显示删除按钮
    validators: [Validators.required, Validators.maxLength(11)], //验证
    defaultValue: '', //默认值
    readonly: true, //只读
    isfloat: true,//是否半长浮动//需相邻两项同时使用
    TreeSelectconfig: {//TreeSelect选择数据配置
      list: [],//TreeSelect选择数据
      // ischecked: true,//是否多选
      // isoperate: true,//是否显示菜单
      // isdrop:true,//是否可以拖动
      //isSelectShow:true,//是否显示选中的按钮
      // isInput:true,//是否是输入框树
    },//TreeSelect选择数据
  }]
  //设置表单字段
  formgroup: FormGroup = this.setformdata(this.formdata);

  /* 设置表单字段 */
  setformdata(val: dynamicform[]) {
    let _formgroup: any = {};
    val.forEach((item: dynamicform, index: number) => {
      _formgroup[item.name] = [
        { value: item.defaultValue || '', disabled: item.disabled },
        Validators.compose(item.validators),
      ];
    });
    // console.log('设置表单字段', _formgroup);
    return this.fb.group(_formgroup);
  }
  /* 表单提交 */
  OnSaveSubmit(event: any) {
    console.log('表单提交', event.value, this.formgroup.value);
    // if (this.modalconfig.contype === 'roles') {
    //     if (this.modalconfig.status == 'Addroles') {
    //     }
    // }
  }


  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.getunitsList()
  }
  /* 获取组织机构列表 */
  getunitsList() {
    this.UnitService
      .getList({
        parentId: '',
        recursive: true,
      })
      .subscribe(res => {
        this.formdata.forEach((item: any, index: any) => {
          if (item.type === 'TreeSelect') {
            item.TreeSelectconfig.list = res.items
            item.TreeSelectconfig.isInput = true
          }
        })
        console.log('获取组织机构列表', res)
      });
  }
  /* 递归·设置列表属性
  setlist  需要递归的数组[{}]
  addAttr 需要递归添加的内容{attr:value}
  term 列表中用于条件判断的字段 string ,
  //term有值
  res.items=this.RecurseSetlist(res.items,[{
    hasChild: true,
    menuslist: ['新建组织机构', '编辑', '删除']//操作菜单
  }, {
    hasChild: false,
    menuslist: ['删除']
  }],'hasChild')
  //term无值
  res.items=this.RecurseSetlist(res.items,[{
    hasChild: true,
    menuslist: ['新建组织机构', '编辑', '删除']
  }])
  
  */
  RecurseSetlist(setlist?: any, addAttr?: any, term?: any) {
    addAttr.forEach((add_item: any, add_index: any) => {
      setlist.forEach((set_item: any, set_index: any) => {
        if (term) {
          if (add_item[term] === set_item[term]) {
            for (const key in add_item) {
              if (key != term) {
                set_item[key] = add_item[key]
              }
            }
          }
        } else {
          for (const key in add_item) {
            set_item[key] = add_item[key]
          }
        }
        if (set_item.children.length > 0) {
          this.RecurseSetlist(set_item.children, addAttr, term);
        }
      })
    })
    // console.log('递归·设置列表属性', setlist)
    return setlist
  }
  /* 设置对象的值 */
  setObjectVal(object: any, input: any) {
    var aimobject = JSON.parse(JSON.stringify(this[object]))
    for (const iterator in input) {
      aimobject[iterator] = input[iterator]
    }
    this[object] = aimobject
  }


  login() {
    this.authService.navigateToLogin();
  }
}
