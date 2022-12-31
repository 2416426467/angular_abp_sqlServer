/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ConfirmationService } from '@abp/ng.theme.shared';

@Component({
  selector: 'lib-add-minus-form',
  templateUrl: './add-minus-form.component.html',
  styleUrls: ['./add-minus-form.component.scss'],
})
export class AddMinusFormComponent implements OnInit {
  constructor(
    private confirmation: ConfirmationService
  ) { }
  @Input() _AddMinusConfig: any;
  @Input() _formgroup: any;
  copyGroupConfig: any;
  copyselectOption: any;
  ngOnInit(): void {
    this.copyGroupConfig = JSON.parse(JSON.stringify(this._AddMinusConfig.groupconfig));
    this.copyselectOption = JSON.parse(JSON.stringify(this._AddMinusConfig.selectOption));
    
    this.clearselectitem()
    // console.log('动态增减表单初始化-数值改变', this._AddMinusConfig, this._formgroup);
  }
  /* 清除已选中的选项 */
  clearselectitem(){
    // this.cleargroupconfig()
    this._AddMinusConfig.defaultValue.forEach((item: any, index: any) => {
      this._AddMinusConfig.selectOption.forEach((item1: any, index1: any) => {
        if (item[this._AddMinusConfig.groupconfig[0].label] === item1.label) {
          this._AddMinusConfig.selectOption.splice(index1,1)
        }
      })
    })
    // console.log('清除已选中的选项', this._AddMinusConfig);
  }
  /* 增加 */
  add_circle() {
    let groupdata = this.getnewValue();
    if (groupdata) {
      this._AddMinusConfig.defaultValue.unshift(groupdata);
      this.cleargroupconfig();
      this.clearselectitem()
    }
  }
  /* 清空 groupconfig表单 */
  cleargroupconfig() {
    this._AddMinusConfig['groupconfig'] = JSON.parse(JSON.stringify(this.copyGroupConfig)); //清空
    this._AddMinusConfig['selectOption'] = JSON.parse(JSON.stringify(this.copyselectOption)); //清空
  }
  // 属性选择框值改变
  selectionChange(event: any) {
    // this.cleargroupconfig();
    this._AddMinusConfig['groupconfig'][0].value = event.value;
    try {
      this._AddMinusConfig.selectOption.forEach((item: any, index: any) => {
        if (item.label === event.value) {
          throw item;
        }
      });
    } catch (error) {
      for (const key in error) {
        if (key === 'label') {
          this._AddMinusConfig.groupconfig[1]['selectlabel'] = error[key];
          continue;
        }
        this._AddMinusConfig.groupconfig[1][key] = error[key];
      }
      this.onsubmit();
      
    }
  }
  // 属性值输入框改变
  valaueinput(inputdata: any) {
    this.onsubmit();
  }
  /* 获取正在输入的值 */
  getnewValue() {
    let groupdata: any = {};
    this._AddMinusConfig.groupconfig.forEach((item: any, index: any) => {
      if (item.label) {
        groupdata[item.label] = item.value;
      }
    });
    if (
      groupdata[this._AddMinusConfig.groupconfig[0].label] == '' ||
      groupdata[this._AddMinusConfig.groupconfig[1].label] == ''
    )
      return;
    return groupdata;
  }
  /* 删除指定默认值 */
  remove_circle_outline(index: any) {
    this._AddMinusConfig.defaultValue.splice(index, 1);
    this.cleargroupconfig()
    this.clearselectitem()
    console.log(this._AddMinusConfig)
    this.onsubmit()
  }
  /* 获取所有需要提交的数据 */
  onsubmit() {
    let groupdata = this.getnewValue();
    if (groupdata) {
      console.log('选择属性名称', groupdata, this._formgroup);
      let submitvalue = [];
      submitvalue = groupdata
        ? [...[groupdata], ...this._AddMinusConfig.defaultValue]
        : this._AddMinusConfig.defaultValue;
      this._formgroup.get(this._AddMinusConfig.name).setValue(submitvalue);
      // this.cleargroupconfig();
    }
  }
}
