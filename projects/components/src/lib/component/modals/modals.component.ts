/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ViewChildren,
  ContentChild,
  ContentChildren,
  TemplateRef,
  Inject,
  Input,
} from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog'; //对话框
/* 挎包引入需更新 */
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'lib-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
})
export class ModalsComponent {
  @ViewChild('modalContent') modalContent: any;
  @ContentChild('libHeader') libHeader: any;
  @ContentChild('libbody') libbody: any;
  @ContentChild('libFooter') libFooter: any;
  _ModalConfig: any;

  @Input() set ModalConfig(val: any) {
    this._ModalConfig = val;
    if (val.ismodalopen) {
      this.openmodal();
    }
  }
  @Output() closeway = new EventEmitter();
  constructor(public dialog: Dialog, private layoutService: LayoutService) {}
  dialogRef: any;
  ngOnInit(): void {
    
  }

  openmodal() {
    // 打开
    // console.log(this.layoutService,"55888")
    this.dialogRef = this.dialog.open<any>(this.modalContent, {
      width: this.layoutService.smallScreen ? '330px' : this._ModalConfig.setwidth,
      height: this._ModalConfig.setheight || '',
      restoreFocus: false,
    });
    // 关闭
    this.dialogRef.closed.subscribe((result: any) => {
      this.dialogRef = null;
      this.closeway.emit();
    });
  }
}
