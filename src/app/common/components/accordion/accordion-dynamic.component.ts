import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, 
          ComponentFactory, ComponentFactoryResolver, ComponentRef, EventEmitter, 
              Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
// import * as componentStore from 'src/app/core';

@Component({
  selector: 'accordion-dynamic',
  template: `
    <div class="accordion-body">
        <template #cntnrTmpl></template>
    </div>
  `
})
export class AccordionDynamicComponent  implements AfterContentInit {
    @ViewChild('cntnrTmpl', { read: ViewContainerRef }) container;
    @Input() tabItem;
    @Output() blurInject = new EventEmitter<{}>();
    cmpRef: ComponentRef<any>;

    constructor(private resolver: ComponentFactoryResolver,
                    private changeDetector: ChangeDetectorRef) {
      }

    ngAfterContentInit() {
        // if (!!componentStore[this.tabItem.rel]) 
        //     this.setContainerFactory(componentStore[this.tabItem.rel]);
      }
    
      setContainerFactory(component) {
        this.container.clear();
        const singlePostFactory: ComponentFactory<any> = this.resolver.resolveComponentFactory(null);
        this.cmpRef = this.container.createComponent(singlePostFactory);
        console.log('cmpRef',component,singlePostFactory, this.cmpRef);
        this.changeDetector.detectChanges();

        // this.cmpRef.instance.typeInput = type;
        // this.cmpRef.instance.output.subscribe(event => console.log(event));

      }
    
      setActionCompletion(val: Object) {
            this.blurInject.emit({whom: 'AccordionTmpl', state:val['state']});
      };
 
      ngOnDestroy() {
        this.cmpRef.destroy();    
      }
}