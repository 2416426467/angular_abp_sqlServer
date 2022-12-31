/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { PermissionsService } from "../../../../proxy/src/lib/index";

@Component({
  selector: 'lib-permission-management',
  templateUrl: './permission-management.component.html',
  styleUrls: ['./permission-management.component.scss']
})
export class PermissionManagementComponent implements OnInit {
  constructor(
    private PermissionsService:PermissionsService
  ) { }

  /* modal 弹窗配置 */
  modalconfig: any = {
    ismodalopen: false,//弹窗是否显示   
    setwidth: '35vw',//弹窗宽度
    setheight: '',//弹窗高度
    title: '',//弹窗标题
    status: '',//弹窗类型，存有删除弹窗delete，表示操作的某块内容是干什么的
    contype: '',//内容类型 表示操作的那块内容
    delectlabel: 'Deletion Confirmation Message',//删除提示
  };

  ngOnInit(): void {
    // console.log(,111111)
  
  }


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

  /* 表单提交 */
  OnSaveSubmit(dialogRefmodal: any) {
    var that = this;

    if (this.modalconfig.status === 'worker') {
      if (this.modalconfig.formtype == 'delete') {
        that.closemodals(dialogRefmodal);

      }
    }
  }
}
