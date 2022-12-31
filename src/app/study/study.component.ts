/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationUnitService } from 'projects/identity/proxys/dignite/abp/identity';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
})
export class StudyComponent implements OnInit {
  constructor(
    private UnitService: OrganizationUnitService
  ) { }

  UnitTree_data: any
  treeconfig: any = {
    list: [],
    // ischecked: true,//是否多选
    // isoperate: true,//是否显示菜单
    // isdrop:true,//是否可以拖动
    //isSelectShow:true,//是否显示选中的按钮
    // isInput:true,//是否是输入框树
  }

  ngOnInit(): void {
    console.log('初始化');
    this.getunitsList()//获取组织机构列表
  }
  /* 获取组织机构列表 */
  getunitsList() {
    this.UnitService
      .getList({ 
        parentId: '',
        recursive: true,
      })
      .subscribe(res => {
        res.items = this.RecurseSetlist(res.items, [{
          menuslist: ['新建组织机构', '编辑', '删除']
        }])
        this.setObjectVal('treeconfig', {
          list: res.items,
          // ischecked: true,
          isoperate: true,
          isdrop:true,
          isSelectShow:true,
          isInput:true,//是否是输入框树
        })
        console.log('获取组织机构列表', this.treeconfig)
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

  /* tree操作菜单选择 */
  MenusSelect(event: any){
    console.log(event,'操作菜单选择',this.treeconfig)
  
  }
  /* tree项拖动事件 */
  TreeMoveOrder(event: any){
    console.log(event,'tree项拖动事件')


  }


}
