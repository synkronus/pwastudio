import { PagesComponent } from 'src/app/core/pages.component';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { MenuService } from "src/app/common/services/menu.service";
import { SubSink } from "subsink";

@Component({
  selector: "app-right-menu",
  templateUrl: "./right-menu.component.html",
  styleUrls: ["./right-menu.component.scss"],
})
export class RightMenuComponent implements OnInit, OnDestroy {
  subsink = new SubSink();

  statusActive = true;
  rightPanelMenuActive: boolean = false;
  messagesActive: boolean;

  //notifications
  notifications:any[];
  wsStatusComm:boolean = false;
  syncState: boolean = false;

  constructor(public app: PagesComponent, private menuService: MenuService) {}

  ngOnInit(): void {


    this.subsink.sink = this.menuService.stateWithPropertyChanges.subscribe(
      (state) => {
        if (!!state && state.stateChanges.hasOwnProperty("rightMenuClick")) {
          let rmclk = state.stateChanges.rightMenuClick;
          this.rightPanelMenuActive = !rmclk ? false : !this.rightPanelMenuActive;
        }
        if(!!state && state.stateChanges.hasOwnProperty("resetMenu")){
          this.rightPanelMenuActive = false;
        }
      });

  }

  syncMsg() {
  }

  messagesClick() {
    this.statusActive = false;
    this.messagesActive = true;
  }

  statusClick() {
    this.statusActive = true;
    this.messagesActive = false;
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
