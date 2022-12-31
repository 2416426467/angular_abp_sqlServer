/* eslint-disable @angular-eslint/contextual-lifecycle */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Injectable, Injector, OnInit, InjectionToken } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
// import { IdentityRoleService } from '../../../../proxys/dignite/abp/identity/index';
import { IdentityClaimTypeService } from '../../../../proxys/dignite/abp/identity/index';
import { ClaimValueType } from "../../enums/claim-value-type";
import { CreateClaim, updataClaim } from "../../NewDefaults/defaults-claim-form-modal";
/* 挎包引入 */
import { dynamicform } from '../../../../../components/src/public-api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ePermissionManagementComponents } from '@abp/ng.permission-management';


@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'lib-claim-types',
  templateUrl: './claim-types.component.html',
  styleUrls: ['./claim-types.component.scss']
})
export class ClaimTypesComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private FormsModule: FormsModule,
    private ClaimService: IdentityClaimTypeService,
    private _snackBar: MatSnackBar,
  ) { }


  /* 组织机构成员表格数据 */
  Setclaimtable: any = {
    maxResultCount: 10, //每页显示数量
    skipCount: 0, //分页
    tdStyle: 'text-align: left;padding: 0 20px;',
    list: [], //表格列表数据
    totalCount: 0, //表格列表数量
    ischeck: false, //是否显示多择按钮
    isoperate: true,
    SelectWorkerData: [], //多选时表格选择的数据
    operatepositionhead: true,//操作是否显示在表头
    displayedColumns: [
      //表格表头
      'name',
      'valueType',
      'description',
      'regex',
      'required',
      'isStatic',
      // 'operate',
    ],
    ColumnsReplace:{
      operate:'Actions',
    },

  };
  //搜索表单数据
  formdata: dynamicform[] = [
    {
      type: 'text',
      name: 'filter',
      placeholder: 'Search', //文本提示
      validators: [], //验证
    },
  ];
  //搜索表单字段
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
    return this.fb.group(_formgroup);
  }
  /* 弹窗配置 */
  modalconfig: any = {
    ismodalopen: false,//弹窗是否显示
    setwidth: '',//弹窗宽度
    setheight: '',//弹窗高度
    title: '',//弹窗标题
    status: '',//弹窗类型，存有删除弹窗delete，表示操作的某块内容是干什么的
    contype: '',//内容类型 表示操作的那块内容
  };

  /* 弹窗表单数据 */
  modalformdata: dynamicform[] = [];
  //搜索表单字段
  modalformgroup: FormGroup = this.setformdata(this.modalformdata);

  /* 是否开启控制器 */
  ismodalopen = false;
  /* 开启 modal */
  openmodals(setwidth?: any, setheight?: any) {
    this.setObjectVal('modalconfig', {
      ismodalopen: true,
      setwidth: setwidth ? setwidth : '35vw',
      setheight: setheight ? setheight : '',
    })
  }
  /* 关闭 modal */
  closemodals(dialogRefmodal: any) {
    if (dialogRefmodal) dialogRefmodal.close();
    this.modalconfig = {}
    this.setObjectVal('modalconfig', {
      ismodalopen: false,
    })
    // console.log(this.modalconfig, '关闭 查看配置 关闭 modal')
    this.RecoveryForm()//复位表单
  }
  ngOnInit() {
    this.getallclaim();
    console.log(ClaimValueType, 1111)
  }

  /* 获取所有claim */
  getallclaim(filter?: any) {
    var _that = this;
    this.ClaimService
      .getList({
        maxResultCount: this.Setclaimtable.maxResultCount,
        skipCount: this.Setclaimtable.skipCount * this.Setclaimtable.maxResultCount,
        filter: filter,
      })
      .subscribe(res => {
        res.items.forEach((item: any, index: any) => {
          item.valueType = ClaimValueType[item.valueType]
          if (!item.isStatic) {
            item.operate = [{
              type: 'menus',
              label: 'Actions',
              menuslist: ['Edit', 'Delete']
            }]
          }
        })
        console.log(res, '获取所有角色');
        let Setclaimtable = JSON.parse(JSON.stringify(this.Setclaimtable));
        Setclaimtable.list = res.items;
        Setclaimtable.totalCount = res.totalCount;
        this.Setclaimtable = Setclaimtable;
      });
  }
  /* 搜索人员 */
  searchbtn() {
    let formdata = this.formgroup.value;
    // console.log(formdata, '搜索人员');
    this.Recoverytableworker()//复位表格
    this.getallclaim(formdata.filter)
  }
  /* 分页器切换分页 */
  pageworkerchange(val: any) {
    this.setObjectVal('Setclaimtable', {
      skipCount: val.pageIndex,
    })
    // console.log(this.formgroup.value.filter,11)
    this.getallclaim(this.formgroup.value.filter);
  }
  /* 复位表格 */
  Recoverytableworker() {
    this.setObjectVal('Setclaimtable', {
      skipCount: 0,
      SelectWorkerData: []
    })
  }
  /* 选中表格事件 */
  SelectTheTable(table: any) {
    this.setObjectVal('Setclaimtable', {
      SelectWorkerData: table,
    })
    console.log(table, '选中表格事件');
  }
  /* 设置对象的值 */
  setObjectVal(object: any, input: any) {
    var aimobject = JSON.parse(JSON.stringify(this[object]))
    for (const iterator in input) {
      aimobject[iterator] = input[iterator]
    }
    this[object] = aimobject
    // console.log(this[object],'设置对象的值')
  }
  /* 列表操作方法 */
  tableoperateway(wayval: any) {
    switch (wayval.label) {
      case 'Edit':
        // 设置对象的值
        this.setObjectVal('modalconfig', {
          title: wayval.label,
          status: 'UpdateClarm',
          contype: 'Clarm',
          claimId: wayval.operatemess[0].id,
          concurrencyStamp: wayval.operatemess[0].concurrencyStamp
        })
        let chooseupdataClaim = updataClaim
        console.log(chooseupdataClaim, '66666')
        chooseupdataClaim.forEach((item, index) => {
          if(item.name==='requiredbox'){
            item.checkboxmenu.forEach((checkitem,checkindex)=>{
              if(checkitem.name==='required'){
                checkitem.ischeck=wayval.operatemess[0].required
              }
            })
            return
          }
          item.defaultValue=wayval.operatemess[0][item.name]
          if(item.name==='valueType'){
            item.defaultValue=ClaimValueType[wayval.operatemess[0].valueType]
            return
          }
        })
        this.modalformdata = chooseupdataClaim
        this.modalformgroup = this.setformdata(this.modalformdata);
        this.openmodals('500px')
        break;
      case 'Delete':
        this.setObjectVal('modalconfig', {
          title: wayval.label,
          status: 'delete',
          contype: 'Clarm',
          delectlabel: 'Deletion Confirmation Message',
          operatemess: wayval.operatemess
        })
        this.modalformdata = []
        this.openmodals('35vw',)
        break;
    }
    console.log(this.modalconfig, '查看配置', wayval, '列表操作方法')

  }
  /* 模态框-确认 */
  OnSaveSubmit(dialogRefmodal: any) {
    var that = this;
    if (this.modalconfig.contype === 'Clarm') {
      if (this.modalconfig.status == 'AddClarm') {
        // console.log('模态框-确认', this.modalformgroup.value)
        this.AddClarm(this.modalformgroup.value, function () {
          that.getallclaim(that.formgroup.value.filter);
          that.closemodals(dialogRefmodal);
        })
      }
      if (this.modalconfig.status == 'UpdateClarm') {
        console.log('模态框-确认-UpdateClarm', this.modalformgroup.value)
        this.UpdateClarm(this.modalformgroup.value, function () {
          that.getallclaim(that.formgroup.value.filter);
          that.closemodals(dialogRefmodal);
        })
      }
      if (this.modalconfig.status == 'delete') {
        this.deleteroles(this.modalconfig.operatemess, function () {
          that.closemodals(dialogRefmodal);
        })
      }
    }
  }
  /* 添加Claim弹窗 */
  openAddClaimDialog(title?: string) {
    // 设置对象的值
    this.setObjectVal('modalconfig', {
      title: title,
      status: 'AddClarm',
      contype: 'Clarm',
    })
    this.modalformdata = CreateClaim
    this.modalformgroup = this.setformdata(this.modalformdata);
    this.openmodals('500px')
    console.log(this.modalconfig, '查看配置 添加新角色弹窗', CreateClaim)
  }
  /* 添加新角色*/
  AddClarm(input: any, Addrolesback?: any) {
    input.required = false
    input.requiredbox.forEach((item: any, index: any) => {
      input[item.name] = item.ischeck
    })
    console.log('添加新角色', input)
    this.ClaimService.create(input).subscribe(res => {
      Addrolesback && Addrolesback()
    })
  }
  /* 修改角色*/
  UpdateClarm(input: any, Addrolesback?: any) {
    input.required = false
    input.id=this.modalconfig.claimId
    input.concurrencyStamp=this.modalconfig.concurrencyStamp
    input.requiredbox.forEach((item: any, index: any) => {
      input[item.name] = item.ischeck
    })
    console.log('修改角色', this.modalconfig.claimId, input)
    // Addrolesback && Addrolesback()
    // return
    this.ClaimService.update(input.id, input).subscribe(res => {
      Addrolesback && Addrolesback()
    })
  }
  /* 删除角色 */
  deleteroles(input: any, deleterolesback?: any) {
    console.log('删除角色', input)
    var _that = this
    this.ClaimService.delete(input[0].id).subscribe(res => {
      _that._snackBar.open('删除成功', '', {
        duration: 2500,
        horizontalPosition: 'end',
      });
      if (this.Setclaimtable.list.length === 1) {
        this.setObjectVal('Setclaimtable', {
          skipCount: this.Setclaimtable.skipCount == 0 ? this.Setclaimtable.skipCount : this.Setclaimtable.skipCount - 1,
        })
      }
      this.getallclaim(this.formgroup.value.filter);
      deleterolesback && deleterolesback()
    })
  }
  /* 复位表单数据 */
  RecoveryForm() {
    this.modalformdata = []
    this.modalformgroup = this.setformdata(this.modalformdata);
  }

}
