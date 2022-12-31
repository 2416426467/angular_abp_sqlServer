/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { ABP, RoutesService, TreeNode } from '@abp/ng.core';
import { LayoutService } from '../../services/layout.service';
import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  QueryList,
  Renderer2,
  TrackByFunction,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'abp-routes',
  templateUrl: 'routes.component.html',
  styleUrls: ['routes.component.scss', '../colour.scss'],
})
export class RoutesComponent {
  @Input() smallScreen?: boolean;
  @Input() issideicon: any; //是否只显示图标
  @Output() togglebarnav = new EventEmitter();
  @Output() changebarnav = new EventEmitter();
  @ViewChildren('childrenContainer') childrenContainers!: QueryList<ElementRef<HTMLDivElement>>;
  panelOpenState = false;



  rootDropdownExpand = {} as { [key: string]: boolean };

  trackByFn: TrackByFunction<TreeNode<ABP.Route>> = (_, item) => item.name;

  constructor(
    /* 导航信息 */
    public readonly routesService: RoutesService,
    protected renderer: Renderer2,
    public service: LayoutService
  ) {}
  /* 判断是那种类型的导航，true：多级导航 */
  isDropdown(node: TreeNode<ABP.Route>) {
    return !node?.isLeaf || this.routesService.hasChildren(node.name);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // console.log(this.routesService.visible$, 111111,this.issideicon,2222,this.service.smallScreen);
  }
  ngAfterViewInit() {
    /* service.smallScreen 小屏幕 */
    this.service.subscribeWindowSize();
  }

  closeDropdown() {
    let smallScreen = this.service.smallScreen;
    if (smallScreen) {
      this.togglebarnav.emit();
    }

    if (smallScreen)
      this.childrenContainers.forEach(({ nativeElement }) => {
        this.renderer.addClass(nativeElement, 'd-none');
        setTimeout(() => this.renderer.removeClass(nativeElement, 'd-none'), 0);
      });
  }
}
