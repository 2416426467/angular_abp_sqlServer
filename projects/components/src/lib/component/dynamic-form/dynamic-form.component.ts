/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */

import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';


@Component({
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  constructor(private fb: FormBuilder, private FormsModule: FormsModule) { }

  @ViewChild('text', { static: true }) text: TemplateRef<any>;
  @ViewChild('password', { static: true }) password: TemplateRef<any>;
  @ViewChild('number', { static: true }) number: TemplateRef<any>;
  @ViewChild('tel', { static: true }) tel: TemplateRef<any>;
  @ViewChild('checkbox', { static: true }) checkbox: TemplateRef<any>;
  @ViewChild('radio', { static: true }) radio: TemplateRef<any>;
  @ViewChild('select', { static: true }) select: TemplateRef<any>;
  @ViewChild('TreeSelect', { static: true }) TreeSelect: TemplateRef<any>;
  @ViewChild('email', { static: true }) email: TemplateRef<any>;

  @Input() _formdata: any; //表单数据
  @Input() _formgroup: any; //表单字段


  ispwdeye: boolean = false; //是否隐藏密码

  // displayedColumns: any[] = [setconfigs[0]['attrField'],setconfigs[0]['valueField'],'operate'];
  // dataSource = setconfigs;
  displayedColumns: any = []
  // dataSource=[];

  ngOnChanges(res: any) {
    this._formdata.forEach((item: any, index: any) => {
      if (item.type === 'increase') {
        this.displayedColumns = [item.setincrease[0]['attrField'], item.setincrease[0]['valueField'], 'operate'];
      }
    })
    console.log(this._formdata, "ngOnChanges", this.displayedColumns)
  }
  ngOnInit(): void {
    this.getcheckall(); //获取复选框选择的内容
    // console.log('变化111',this._formdata)
  }
  ngAfterViewInit(): void { }

  /* 清除输入 */
  deletevalue(dyform: any, name: any) {
    this._formgroup.get(name).setValue('');
  }
  /* 密码是否可见 */
  pwdeyechoose(eye: boolean) {
    this.ispwdeye = !eye;
  }
  /* 复选框选择 */
  checkboxchange(checkitem: any, event: any, dyform: any, name: any) {
    checkitem.ischeck = event.checked;

    this.getcheckall(); //获取复选框选择的内容
  }
  /* 获取复选框选择的内容 */
  getcheckall() {
    this._formdata.forEach((item: any, index: any) => {
      if (item.type == 'checkbox') {
        var checkboxchoosearr: any[] = [];
        item.checkboxmenu.forEach((item1: any, index1: any) => {
          if (item1.ischeck) {
            checkboxchoosearr.push(item1);
          }
          if (item.checkboxmenu.length - 1 === index1) {
            this._formgroup.get(item.name).setValue(checkboxchoosearr);
            if (this._formdata.length - 1 === index) {
              // console.log(1111, checkboxchoosearr, this._formgroup.value);
            }
          }
        });
      }
    });
  }

  groupitems: any = {
    attrdata: '',
    valuedata: ''
  }

  /*increase 更改下拉选择值 */
  selectionChange(res: any, datum: any) {
    this.groupitems.attrdata = res.value
    // this._formgroup.value.claim=[]
    console.log(res.value, datum, "更改下拉选择值", this.groupitems, this._formdata)
    this.setformfield(datum)
  }
  /*increase 更改输入框值 */
  valuedatainput(event: any, datum: any) {
    this.groupitems.valuedata = event.value
    this.setformfield(datum)
    console.log(event.value, "更改输入框值", this._formdata)
  }
  /* 设置表单的字段 */
  setformfield(_datum: any) {
    if (this.groupitems.attrdata === '' || this.groupitems.valuedata === '') return
    let claim = []
    claim.push(this.groupitems)
    this._formgroup.get(_datum.name).setValue(claim);
    console.log("设置表单的字段", this._formgroup)
  }
  /* 随机密码 */
  RandomPassword(_datum: any) {
    var num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    var english = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    var ENGLISH = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    var special = ['*', '/', '-', '+', '.', ';', ':', ',', '<', '>', '!', '@', '#', '$', '%', '^', '&', '(', ')', '-', '_', '=']
    var configpwd = [...num, ...english, ...ENGLISH]
    // 先放入一个必须存在的
    var arr = []
    arr.push(this.getOne(num))
    arr.push(this.getOne(english))
    arr.push(this.getOne(ENGLISH))
    arr.push(this.getOne(special))

  // 获取需要生成的长度
  var len = 6

  for (var i = 4; i < len; i++) {
    // 从数组里面抽出一个
    arr.push(configpwd[Math.floor(Math.random() * configpwd.length)])
  }
  // 乱序
  var newArr = ''
  for (var j = 0; j < len; j++) {
    newArr+=arr.splice(Math.random() * arr.length, 1)[0]
  }
    this._formgroup.get(_datum.name).setValue(newArr);
    console.log(newArr, "生成密码")
  }
  getOne(group: any) {
    return group[Math.floor(Math.random() * group.length)]
  }
}
