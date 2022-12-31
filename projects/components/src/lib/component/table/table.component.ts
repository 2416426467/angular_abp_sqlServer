/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ContentChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator'; //分页

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  constructor() { }
  _Settable: any; //表格数据
  PageEvent: PageEvent; //分页数据
  @ViewChild('paginator') paginator: any;
  @Input()
  set Settable(val: any) {
    if (val.displayedColumns.indexOf('operate') == -1 && val.isoperate) {
      if(val.operatepositionhead){
        val.displayedColumns.unshift('operate');
      }else{
        val.displayedColumns.push('operate');
      }
    }
    if (val.displayedColumns.indexOf('ischeck') == -1 && val.ischeck) {
      val.displayedColumns.unshift('ischeck');
      val.list.forEach((item: any, index: any) => {
        item.ischeck = false;
      });
    }
    if (val.SelectWorkerData?.length > 0) {
      val.list.forEach((item: any, index: any) => {
        val.SelectWorkerData.forEach((item1: any, index1: any) => {
          if (item.id === item1.id) {
            item.ischeck = true;
          }
        });
      });
    }
   
    this.listdataSource = val.list;
    this.displayedColumns = val.displayedColumns;
    this.ColumnsReplace=val.ColumnsReplace
    this._Settable = val;
    // console.log(val,"表格数据",val.ColumnsReplace)
  }
  @Output() Paginatorchange = new EventEmitter();
  @Output() tableoperateway = new EventEmitter();
  @Output() SelectTheTable = new EventEmitter();

  ischeckstore: any[] = [];
  displayedColumns: string[]; // 列表表头c
  ColumnsReplace:any[];//表头替换
  listdataSource = []; //列表数据
  tableselect: any = null; //当前点击列表项

  

  ngOnInit(): void { }
  ngAfterViewInit() { }
  /*分页器切换分页 */
  pagechange(event: any) {
    this.Paginatorchange.emit(event);
  }
  /* 表格操作方法 */
  operateway(element: any, label: any) {
  
    this.tableoperateway.emit({
      operatemess: [element],
      label: label,
    });
    
  }

  /* 删除所有选中 */
  deleteall() {
    this.tableoperateway.emit({
      operatemess: this.ischeckstore,
      label: '删除',
    });
  }

  /* 列表项点击事件 */
  clickedRows(res: any) {
    if (this._Settable.ischeck) {
      res.ischeck = !res.ischeck;
      if (res.ischeck) {
        this.ischeckstore.push(res);
      } else {
        this.ischeckstore.forEach((item: any, index: any) => {
          if (item.id == res.id) {
            this.ischeckstore.splice(index, 1);
          }
        });
      }
      
      this.SelectTheTable.emit(this.ischeckstore);
    } else {
      this.tableselect = res;
      this.SelectTheTable.emit(this.tableselect);
    }
    // console.log(res,"列表项点击事件")
  }
  /* 全选此页列表项 */
  RowsAllSelect(e: any){
    this.ischeckstore=[]
    this.listdataSource.forEach((item:any,index:any)=>{
      item.ischeck=e.checked
      if(item.ischeck){
        this.ischeckstore.push(item);
      }
    })
    // console.log(e,"全选此页列表项",e.checked,this.listdataSource, this.ischeckstore)
    this.SelectTheTable.emit(this.ischeckstore);
  }
}
