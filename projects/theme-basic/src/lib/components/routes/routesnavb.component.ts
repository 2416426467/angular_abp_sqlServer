/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { ABP, RoutesService, TreeNode } from '@abp/ng.core';
import { LayoutService } from '../../services/layout.service';
import {
  Component,
  ElementRef,
  OnInit,
  Input,
  Output,
  QueryList,
  Renderer2,
  TrackByFunction,
  ViewChildren,
} from '@angular/core';
@Component({
  selector: 'lib-routesnavb',
  templateUrl: './routesnavb.component.html',
  styleUrls: ['./routesnavb.component.scss']
})
export class RoutesnavbComponent implements OnInit {
  trackByFn: TrackByFunction<TreeNode<ABP.Route>> = (_, item) => item.name;
  @Input() issideicon:any//是否只显示图标
  smallScreen:boolean;//屏幕大小
  @ViewChildren('childrenContainer') childrenContainers!: QueryList<ElementRef<HTMLDivElement>>;
  constructor(
    /* 导航信息 */
    public readonly routesService: RoutesService,
    protected renderer: Renderer2,
    public service: LayoutService 
    
  ) {}

  ngOnInit(): void {
    console.log(this.routesService.visible$, 111111,this.issideicon,2222,this.service);
  }
  /* 判断是那种类型的导航，true：多级导航 */
  isDropdown(node: TreeNode<ABP.Route>) {
    return !node?.isLeaf || this.routesService.hasChildren(node.name);
  }
  ngAfterViewInit() {
    /* service.smallScreen 小屏幕 */
    this.service.subscribeWindowSize();
  }
  closeDropdown() {
    this.childrenContainers.forEach(({ nativeElement }) => {
      this.renderer.addClass(nativeElement, 'd-none');
      setTimeout(() => this.renderer.removeClass(nativeElement, 'd-none'), 0);
    });
  }

}
