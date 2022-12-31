/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@abp/ng.core';

import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';

/* 挎包引入 */
import { dynamicform, SnackBarComponent } from '../../../../../components/src/public-api';

// import { dynamicform } from 'components';

import { MatSnackBar } from '@angular/material/snack-bar'; // 快餐栏
import { TimesService } from '../../services/times.service'; //时间服务
/* 引入 proxys 代理 */
import {
  OrganizationUnitService,
  IdentityRoleService,
  IdentityUserService,
  IdentityOrganizationUnitsDto
} from '../../../../proxys/dignite/abp/identity/index';

@Component({
  selector: 'lib-organization-units',
  templateUrl: './organization-units.component.html',
  styleUrls: ['./organization-units.component.scss'],
})
export class OrganizationUnitsComponent implements OnInit {
  constructor(
    private localizationService: LocalizationService,
    private unitsService: OrganizationUnitService, //新
    private UserService: IdentityUserService, //新
    private RoleService: IdentityRoleService,
    private _snackBar: MatSnackBar,
    private timesService: TimesService,
    private fb: FormBuilder,
    private FormsModule: FormsModule,
    private cd: ChangeDetectorRef
  ) { }
  // 树
  treeControl = new NestedTreeControl<IdentityOrganizationUnitsDto>(node => node.children);
  treeinit_data: any; /* 树形数据 */
  buttonselect: any; //选择的树分支
  hasChild = (_: number, node: IdentityOrganizationUnitsDto) =>
    !!node.children && node.children.length > 0; // 是否有子集
  isdrag: boolean = false; //是否拖动
  dragstartnode: any; //树分支开始拖动的值
  dropnode: any; //树分支拖动放开的值
  unitname: string; //添加组织机构的名称
  checkboxlist: any[]; //角色列表
  @ViewChild('tree') tree: { renderNodeChanges: () => void }; //选择器tree
  /* modal 弹窗信息 */
  modalsmess: any = {
    // title: '弹窗信息',
    // diydata: null,
  };
  /* 弹窗配置 */
  modalconfig: any = {
    ismodalopen: false, //是否开启控制器
    setwidth: '30vw', //弹窗宽度
    setheight: '', //弹窗高度
  };
  //表单数据
  formdata: dynamicform[] = [];
  //设置表单字段
  formgroup: FormGroup = this.setformdata(this.formdata);

  /* 组织机构添加新成员表格数据 */
  Setworkertable: any = {
    maxResultCount: 10, //每页显示数量
    skipCount: 0, //分页
    list: [], //表格列表数据
    totalCount: 0, //表格列表数量
    ischeck: true, //是否显示多择按钮
    SelectWorkerData: [], //多选时表格选择的数据
    displayedColumns: [
      //表格表头
      'name',
      'phoneNumber',
      'userName',
      'email',
      'isActive',
      'creationTime',
      // 'operate',
    ],
    ColumnsReplace: {
      name: 'UserName',
      phoneNumber: 'PhoneNumber',
      userName: 'Surname',
      email: 'EmailAddress',
      creationTime: 'CreationTime',
      operate: 'Action',
    },
  };

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
  durationInSeconds: number = 2.5;//文本提示消失时间

  /* 初始 */
  ngOnInit(): void {
    /* 开始拖动时触发*/
    var _that = this;
    this.dragging(); //拖拽方法
    this.getunitsList(); // 获取组织机构列表
    this.getrolesList(function () { }); // 获取角色列表

    // console.log(_that.durationInSeconds * 1000)

   



  }

  /* 开启 modal */
  openmodals(setwidth?: any, setheight?: any) {
    let modalconfig = JSON.parse(JSON.stringify(this.modalconfig));
    modalconfig.ismodalopen = true;
    modalconfig.setwidth = setwidth ? setwidth : '30vw';
    modalconfig.setheight = setheight ? setheight : '';
    this.modalconfig = modalconfig;
  }
  /* 关闭 modal */
  closemodals(dialogRefmodal: any) {
    if (dialogRefmodal) dialogRefmodal.close();
    let modalconfig = JSON.parse(JSON.stringify(this.modalconfig));
    modalconfig.ismodalopen = false;
    this.modalconfig = modalconfig; //修改modal配置
    this.formdata = []; //复原表单数据
    this.formgroup = this.setformdata(this.formdata); //复原表单数据
    this.modalsmess = {}; //复原modal详情
    this.ResettingRole(); //复位角色
  }

  /* 复位角色 */
  ResettingRole() {
    this.checkboxlist.forEach((item: any, index: any) => {
      item.ischeck = false;
    });
  }
  /* 获取角色列表 */
  getrolesList(getrolesback: any) {
    this.RoleService.getAllList().subscribe(res => {
      res.items.forEach((item: any, index: any) => {
        item.ischeck = false;
        item.diaplayname = item.name;
      });
      this.checkboxlist = res.items;
      getrolesback && getrolesback();
    });
  }

  /* 获取组织机构列表 */
  getunitsList() {
    this.unitsService
      .getList({
        parentId: '',
        recursive: true,
      })
      .subscribe(res => {
        this.treeinit_data = new ArrayDataSource(res.items);
        this.tree.renderNodeChanges();
      });
  }
  /* 递归·1查询指定父级id的数据 */
  RecursiveLoop(dataarr: any, parentId: string, RecursiveLoopback: any) {
    if (parentId === '' || parentId === null) {
      RecursiveLoopback && RecursiveLoopback(dataarr);
      return;
    }
    try {
      dataarr.forEach((item1: any, index1: any) => {
        if (item1.id === parentId) {
          throw item1;
        }
        if (item1.children.length > 0) {
          this.RecursiveLoop(item1.children, parentId, RecursiveLoopback);
        }
      });
    } catch (error) {
      RecursiveLoopback && RecursiveLoopback(error.children);
    }
  }
  /* 列表右上角添加人员 */
  openAddworkerDialog(selectunits: any, alerttitle: string) {
    var that = this;
    that.modalsmess = {
      title: alerttitle,
      selectunits: selectunits,
      formtype: 'Addworker',
      status: 'worker',
    };

    // 打开
    that.formdata = [
      {
        type: 'text',
        name: 'filter',
        // diaplayname: null,
        placeholder: 'UsernameOrEmailOrNameOrPhoneNumber', //文本提示
        validators: [], //验证
      },
    ];
    //设置表单字段
    that.formgroup = this.setformdata(this.formdata);
    that.openmodals('60vw', '80vh'); //开启 modal
    this.Recoverytableworker(); //表格复位
    this.getallworker(); //获取所有人员列表
  }

  /* 获取所有人员列表 */
  getallworker(filter?: string) {
    this.UserService.getList({
      maxResultCount: this.Setworkertable.maxResultCount,
      skipCount: this.Setworkertable.skipCount * this.Setworkertable.maxResultCount,
      filter: filter,
    }).subscribe(res => {
      // console.log(res, '获取所有人员列表');
      let Setworkertable = JSON.parse(JSON.stringify(this.Setworkertable));
      Setworkertable.list = res.items;
      Setworkertable.filter = filter;
      Setworkertable.totalCount = res.totalCount;
      this.Setworkertable = Setworkertable;
    });
  }
  /* 搜索人员 */
  searchbtn() {
    let formdata = this.formgroup.value;
    this.Recoverytableworker();
    this.getallworker(formdata.filter);
  }

  /* 分页器切换分页 */
  pageworkerchange(val: any) {
    this.Setworkertable.skipCount = val.pageIndex;
    this.getallworker(this.Setworkertable.filter);
  }
  /* 复位表格 */
  Recoverytableworker() {
    let Setworkertable = JSON.parse(JSON.stringify(this.Setworkertable));
    Setworkertable.skipCount = 0;
    Setworkertable.SelectWorkerData = [];
    this.Setworkertable = Setworkertable;
  }
  /* 选中表格事件 */
  SelectTheTable(table: any) {
    let Setworkertable = JSON.parse(JSON.stringify(this.Setworkertable));
    Setworkertable.SelectWorkerData = table;
    this.Setworkertable = Setworkertable;
  }
  /* 添加人员 */
  Addworker(selectunits: any, SelectWorkertableData: any, Addworkerback: () => void) {
    const userIds = [];
    SelectWorkertableData.forEach((item: any, index: any) => {
      userIds.push(item.id);
    });
    this.unitsService
      .addMembers(selectunits.id, {
        userIds: userIds,
      })
      .subscribe(res => {
        this.getuserslist(selectunits); //获取指定组织机构的用户列表
        Addworkerback && Addworkerback();
      });
  }
  /* 表单提交 */
  OnSaveSubmit(dialogRefmodal: any) {
    var that = this;
    if (this.modalsmess.status === 'tree') {
      if (this.modalsmess.formtype == 'create') {
        this.addunits(this.formgroup.value, function () {
          that.closemodals(dialogRefmodal);
        });
      }
      if (this.modalsmess.formtype == 'update') {
        this.Updateunits(this.formgroup.value, function () {
          that.closemodals(dialogRefmodal);
        });
      }
      if (this.modalsmess.formtype == 'delete') {
        this.Delectunits(
          { unitid: this.modalsmess.unitid, parentId: this.modalsmess.parentId },
          function () {
            that.closemodals(dialogRefmodal);
          }
        );
      }
    }
    if (this.modalsmess.status === 'worker') {
      if (this.modalsmess.formtype == 'delete') {
        this.DeleteUnitUser(
          { selectTree: this.modalsmess.selectTree, Usermessarray: this.modalsmess.Usermessarray },
          function () {
            that.closemodals(dialogRefmodal);
          }
        );
      }
      if (this.modalsmess.formtype == 'Addworker') {
        this.Addworker(
          this.modalsmess.selectunits,
          this.Setworkertable.SelectWorkerData,
          function () {
            that.closemodals(dialogRefmodal);
          }
        );
      }
    }
  }
  /* 新建根组织 对话框弹出方法*/
  openADDunitDialog(nodes: any, alerttitle: string): void {
    this.modalsmess = {
      title: alerttitle,
      unitid: nodes.id,
      formtype: 'create',
      status: 'tree',
    };

    this.modalsmess = {
      title: alerttitle,
      unitid: nodes.id,
      formtype: 'create',
      status: 'tree',
    };
    // 打开
    this.formdata = [
      {
        type: 'text',
        name: 'displayName',
        diaplayname: 'DisplayName',
        placeholder: '', //文本提示
        isdelectbtn: true, //是否显示删除按钮
        validators: [Validators.required], //验证
      },
      {
        type: 'checkbox',
        name: 'roleIds',
        diaplayname: 'Roles',
        validators: [], //验证
        checkboxmenu: this.checkboxlist, //复选框选择数据
      },
    ];
    //设置表单字段
    this.formgroup = this.setformdata(this.formdata);

    this.openmodals(); //开启 modal
  }
  /* 添加组织机构请求方法 */
  addunits(data: any, addunitsback: any) {
    var _that = this;
    data.parentId = _that.modalsmess.unitid;
    data.roleIdsgroup = [];
    data.roleIds.forEach((item: any, index: number) => {
      data.roleIdsgroup.push(item.id);
    });
    _that.unitsService
      .create({
        displayName: data.displayName,
        roleIds: data.roleIdsgroup || null,
        parentId: data.parentId || null,
      })
      .subscribe(res => {
        _that.RecursiveLoop(_that.treeinit_data._data, res.parentId, function (result: any) {
          result.push({
            children: [],
            code: res.code,
            concurrencyStamp: res.concurrencyStamp,
            displayName: res.displayName,
            extraProperties: res.extraProperties,
            hasChild: false,
            id: res.id,
            parentId: res.parentId,
          });
          _that._snackBar.openFromComponent(SnackBarComponent, {
            data: {
              message: "添加成功",
              type:'success',//success,warn
            },
            duration: _that.durationInSeconds * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        });
        _that.treeinit_data = new ArrayDataSource(_that.treeinit_data._data);
        _that.tree.renderNodeChanges();
        addunitsback && addunitsback();
      });
  }

  /* 编辑组织机构对话框弹出*/
  openUpdateUnitsDialog(nodes?: any): void {
    var that = this;
    // 打开
    this.unitsService.get(nodes.id).subscribe(nodes => {
      that.checkboxlist.forEach((item: any, index: any) => {
        item.ischeck = false;
        nodes.roles.forEach((item1: any, index1: any) => {
          if (item.id === item1.id) {
            item.ischeck = true;
          }
        });
      });
      this.modalsmess = {
        title: 'Edit',
        unitid: nodes.id,
        formtype: 'update',
        status: 'tree',
        concurrencyStamp: nodes.concurrencyStamp,
      };
      // 表单配置
      this.formdata = [
        {
          type: 'text',
          name: 'displayName',
          diaplayname: 'DisplayName',
          placeholder: '', //文本提示
          isdelectbtn: true, //是否显示删除按钮
          validators: [Validators.required], //验证
          defaultValue: nodes.displayName,
        },
        {
          type: 'checkbox',
          name: 'roleIds',
          diaplayname: 'Roles',
          validators: [], //验证
          checkboxmenu: this.checkboxlist, //复选框选择数据
        },
      ];
      //设置表单字段
      this.formgroup = this.setformdata(this.formdata);
      this.openmodals(); //开启 modal
    });
  }
  /* 修改组织机构请求方法 */
  Updateunits(data: any, Updateunitsback: any) {
    var _that = this;
    data.concurrencyStamp = this.modalsmess.concurrencyStamp;
    data.unitid = this.modalsmess.unitid;
    data.roleIdsgroup = [];
    data.roleIds.forEach((item: any, index: number) => {
      data.roleIdsgroup.push(item.id);
    });

    _that.unitsService
      .update(data.unitid, {
        displayName: data.displayName,
        roleIds: data.roleIdsgroup || null,
        concurrencyStamp: data.concurrencyStamp || null,
      })
      .subscribe(res => {
        _that.RecursiveLoop(_that.treeinit_data._data, res.parentId, function (result: any) {
          result.forEach((item: any, index: any) => {
            if (item.id === data.unitid) {
              item.displayName = res.displayName;
            }
          });
          _that._snackBar.openFromComponent(SnackBarComponent, {
            data: {
              message: "修改成功",
              type:'success',//success,warn
            },
            duration: _that.durationInSeconds * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        });

        _that.treeinit_data = new ArrayDataSource(_that.treeinit_data._data);
        _that.tree.renderNodeChanges();

        Updateunitsback && Updateunitsback();
      });
  }
  /* 删除组织机构对话弹窗 */
  openDelectunitDialog(nodes: any) {
    var that = this;
    this.modalsmess = {
      title: 'Delete',
      unitid: nodes.id,
      parentId: nodes.parentId,
      formtype: 'delete',
      status: 'tree',
      // delectlabel: 'Deletion Confirmation Message',
      delectlabel: 'ItemWillBeDeletedMessage',
    };
    this.openmodals(); //开启 modal
  }
  /* 删除组织机构方法 */
  Delectunits(data: any, Delectunitsback: any) {
    var _that = this;
    _that.unitsService.delete(data.unitid).subscribe((res: any) => {
      _that.RecursiveLoop(_that.treeinit_data._data, data.parentId, function (result: any) {
        result.forEach((item: any, index: any) => {
          if (item.id === data.unitid) {
            result.splice(index, 1);
          }
        });
        _that._snackBar.openFromComponent(SnackBarComponent, {
          data: {
            message: "删除成功",
            type:'success',//success,warn
          },
          duration: _that.durationInSeconds * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      });
      _that.treeinit_data = new ArrayDataSource(_that.treeinit_data._data);
      _that.tree.renderNodeChanges();
      Delectunitsback && Delectunitsback();
    });
  }

  /* 树形项点击事件 */
  clickedtree(trees: any) {
    this.buttonselect = trees;
    this.Recoverytable(); //复位表格
    this.getuserslist(trees); //获取指定组织机构的用户列表
  }
  /* 组织机构已选择成员表格数据 */
  Settable: any = {
    maxResultCount: 10, //每页显示数量
    skipCount: 0, //分页
    list: [], //表格列表数据
    totalCount: 0, //表格列表数量
    ischeck: false, //是否显示多择按钮
    displayedColumns: [
      //表格表头
      'name',
      'phoneNumber',
      'userName',
      'email',
      'isActive',
      'creationTime',
      // 'operate',
    ],
    ColumnsReplace: {
      name: 'UserName',
      phoneNumber: 'PhoneNumber',
      userName: 'Surname',
      email: 'EmailAddress',
      // isActive:'',
      creationTime: 'CreationTime',
      operate: 'Action',
    },
    isoperate: true, //是否显示操作按钮

    // queryvalue: '',
    // queryplaceholder: '请输入搜索名称/手机号/邮箱',
  };
  /* 复位表格 */
  Recoverytable() {
    let Settable = JSON.parse(JSON.stringify(this.Settable));
    Settable.skipCount = 0;
    this.Settable = Settable;
  }
  /*获取指定组织机构的用户列表 */
  getuserslist(trees: any) {
    let that = this;
    let Settable = JSON.parse(JSON.stringify(that.Settable));

    this.unitsService
      .getMembers(trees.id, {
        maxResultCount: Settable.maxResultCount,
        skipCount: Settable.skipCount * Settable.maxResultCount,
      })
      .subscribe(res => {
        res.items.forEach((item1: any, index1: any) => {
          item1.creationTime = this.timesService.settime(item1.creationTime, 'dd/mm/yy hh:mm:ss');
          item1.operate = [{
            label: 'Delete',
          }]
        });
        Settable.list = res.items;
        Settable.totalCount = res.totalCount;
        that.Settable = Settable;
      });
  }
  /* 表格操作方法
  return {
    element:{}
    label:'删除'
  }
  */
  tableoperateway(wayval: any) {
    console.log("列表项点击事件", wayval)
    if (wayval.label == 'Delete') {
      let Usermessarray: any = [];
      wayval.operatemess.forEach((item: any, index: any) => {
        Usermessarray.push(item.id);
      });
      this.modalsmess = {
        title: 'Delete',
        selectTree: this.buttonselect,
        Usermessarray: Usermessarray,
        formtype: 'delete',
        status: 'worker',
        delectlabel: 'Deletion Confirmation Message',
      };

      this.openmodals(); //开启 modal
    }
  }
  /* 删除组织机构中指定用户*/
  DeleteUnitUser(data: any, DeleteUnitUserback: any) {
    var _that = this;
    let Settable = JSON.parse(JSON.stringify(_that.Settable));
    _that.unitsService
      .removeMembers(data.selectTree.id, {
        userIds: data.Usermessarray,
      })
      .subscribe(res => {
        _that.getuserslist(data.selectTree);
        _that._snackBar.openFromComponent(SnackBarComponent, {
          data: {
            message: "删除成功",
            type:'success',//success,warn
          },
          duration: _that.durationInSeconds * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        DeleteUnitUserback && DeleteUnitUserback();
      });
  }

  /* 分页器切换分页 */
  pagechange(val: any) {
    this.Settable.skipCount = val.pageIndex;
    this.getuserslist(this.buttonselect);
  }

  /* 拖拽 */
  dragging() {
    var that = this;
    // 开始拖动时触发
    document.addEventListener('dragstart', function (event) {
      var node = event.target['node'];
      that.isdrag = true;
      that.dragstartnode = node;
      console.log('开始拖动时触发', node, event)
    });
    // 完成拖动时触发
    document.addEventListener('dragend', function (event) {
      var node = event.target['node'];
      that.isdrag = false;
    });
    /* 移动时触发 */
    document.addEventListener('dragover', function (event) {
      event.preventDefault();
    });
    // 当被鼠标拖动的对象进入其容器范围内时触发此事件
    document.addEventListener('dragenter', function (event) {
      var dragenter = event.target['node'];

      var dragstartnode = that.dragstartnode;
      if (event.target['className'].indexOf('dragchildren') != -1) {
        if (dragstartnode.id != dragenter.node.id) {
          event.target['classList'].add('dragchildrenhover');
        }
      }
      if (event.target['className'].indexOf('dragsibling') != -1) {
        if (dragstartnode.id != dragenter.node.id) {
          event.target['classList'].add('dragsiblinghover');
        }
      }
    });
    // 当被鼠标拖动的对象离开其容器范围内时触发此事件
    document.addEventListener('dragleave', function (event) {
      if (event.target['className'].indexOf('dragchildren') != -1) {
        event.target['classList'].remove('dragchildrenhover');
      }
      if (event.target['className'].indexOf('dragsibling') != -1) {
        event.target['classList'].remove('dragsiblinghover');
      }
    });
    // 在一个拖动过程中释放鼠标键时触发此事件
    document.addEventListener('drop', function (event) {
      event.preventDefault();
      if (event.target['className'].indexOf('dragchildren') != -1) {
        event.target['classList'].remove('dragchildrenhover');
      }
      if (event.target['className'].indexOf('dragsibling') != -1) {
        event.target['classList'].remove('dragsiblinghover');
      }
      var dropnode = event.target['node']; //释放的值
      var dragstartnode = that.dragstartnode; //开始拖动的值
      that.dropnode = dropnode;
      console.log('在一个拖动过程中释放鼠标键时触发此事件', dropnode, event)
      // 将拖拽完成的后的处理事件写在这里
      let position = dropnode.action;
      let targetId = dropnode.node.id;
      that.moveorder(dragstartnode, dropnode.node, position);
    });
  }
  /*移动请求 */
  moveorder(start: any, target: any, position: any) {
    var that = this;
    if (start.id == target.id) return;
    this.unitsService
      .move(start.id, {
        targetId: target.id,
        position: position,
      })
      .subscribe(res => {
        that.RecursiveLoop(this.treeinit_data._data, start.parentId, function (query: any) {
          query.forEach((item1: any, index1: number) => {
            if (item1.id === start.id) {
              query.splice(index1, 1);
              that.treeinit_data = new ArrayDataSource(that.treeinit_data._data);
              that.tree.renderNodeChanges();
            }
          });
        });
        that.RecursiveLoop(this.treeinit_data._data, target.parentId, function (query: any) {
          query.forEach((item1: any, index1: number) => {
            if (item1.id === target.id) {
              start.extraProperties = res.extraProperties;
              if (position === 'Inside') {
                start.parentId = target.id;
                item1.children.push(start);
                that.treeControl.expand(item1);
              } else if (position === 'Bottom') {
                start.parentId = target.parentId;
                query.splice(index1 + 1, 0, start);
              }
              that.treeinit_data = new ArrayDataSource(that.treeinit_data._data);
              that.tree.renderNodeChanges();
            }
          });
        });
      });
  }
}
