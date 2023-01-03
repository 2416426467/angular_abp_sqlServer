/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit,ViewChild ,Output,EventEmitter} from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ArrayDataSource } from '@angular/cdk/collections';



@Component({
  selector: 'lib-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  constructor() { }
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource: any;
  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
  TreeConfig:any;//tree配置
  @Output() _MenusSelect=new EventEmitter()
  @Output() _TreeMoveOrder=new EventEmitter()
  @Output() _selectTreeItems=new EventEmitter()
  /* 接收传值tree数据，并重新赋值 */
  @Input() set _TreeConfig(val:any){
    this.dataSource= new ArrayDataSource(val.list);
    this.TreeConfig=val
    console.log(this.TreeConfig,'接收传值tree数据，并重新赋值',this.dataSource)
  }
  /* 选择tree的某一个分支(fork) */
  select_fork:any
  isdrag: boolean = false; //是否拖动
  dragstartnode: any; //树分支开始拖动的值
  dropnode: any; //树分支拖动放开的值
  ngOnInit(): void {
    this.dragging()
  }
  /* 选择树 */
  selectTree_label(nodes?:any){
    console.log(nodes,'选择树')
    this.select_fork=nodes
    let TreeConfig=this.TreeConfig
    this._selectTreeItems.emit({nodes,TreeConfig})
  }
  /* 操作菜单选择 */
  menusSelect(nodes: any,menu: any){
    // console.log(nodes,menu,'操作菜单选择')
    this._MenusSelect.emit({nodes,menu});
  }
/* 拖拽 */
dragging() {
  var that = this;
  if(that.TreeConfig.isdrop) return;
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
    // console.log(dragstartnode,'在一个拖动过程中释放鼠标键时触发此事件', dropnode,)
    // 将拖拽完成的后的处理事件写在这里
    let position = dropnode.action;
    let targetId = dropnode.node.id;
    // that.moveorder(dragstartnode, dropnode.node, position);
    
    // console.log('在一个拖动过程中释放鼠标键时触发此事件',that.TreeConfig)
    
    that._TreeMoveOrder.emit({
      start:dragstartnode,
      target:dropnode.node,
      position:position,
    });

  });
}
}
