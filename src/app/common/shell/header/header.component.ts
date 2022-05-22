import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { SubSink } from 'subsink';
import { UserLoginModel } from 'src/app/modules/auth/models/auth.model';
import { PagesComponent } from 'src/app/core/pages.component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MenuService } from '../../shared/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {


  subsink = new SubSink();
  // menu
  topbarUserMenuActive: boolean = false;
  userMenuClick: boolean = false;
  inlineModel: boolean = false;
  topbarNotificationMenuActive: boolean = false;

  // User Login
  usrLgn: UserLoginModel;


  constructor(public app: PagesComponent, private menuService: MenuService,
    private authService: AuthService, private router: Router) {
  }


  ngOnInit() {
    this.subsink.sink = this.authService.stateWithPropertyChanges.subscribe(
      (state) => {
        if (!!state && state.stateChanges.hasOwnProperty("userLogin")) {
          this.usrLgn = state.stateChanges.userLogin;
        }
      });

    this.usrLgn = this.authService.GetStateLoginOp("userLogin");

    this.subsink.sink = this.menuService.stateWithPropertyChanges.subscribe(
      (state) => {
        if (!!state && state.stateChanges.hasOwnProperty("resetMenu")) {
          this.topbarUserMenuActive = false;
          this.topbarNotificationMenuActive = false;
        }
      });
  }


  LogOut() {
    this.router.navigate(['/login']);
    setTimeout(() => {
      this.authService.SignOut();
    }, 300);
  }

  onMenuButtonClick(e) {
    e.preventDefault();
    this.topbarUserMenuActive = false;
    let obj = {
      menuClick: true,
      topbarUserMenuActive: false,
      topbarNotificationMenuActive: false,
      rightPanelMenuActive: false
    };
    this.menuService.setMenuOp('onMenuButtonClick', obj, 'header::onMenuButtonClick');
  }

  onTopbarNotificationMenuButtonClick(event) {
    this.topbarNotificationMenuActive = !this.topbarNotificationMenuActive;
    this.topbarUserMenuActive = false;
    this.menuService.setMenuOp('rightMenuClick', null);
    // this.menuService.setMenuOp('overlayMenuActive',false);
    // this.notificationMenuClick = true;
    // this.hideOverlayMenu();

  }

  onTopbarUserMenuButtonClick(event) {
    event.preventDefault();
    this.userMenuClick = true;
    this.topbarNotificationMenuActive = false;
    this.topbarUserMenuActive = !this.topbarUserMenuActive;
    this.menuService.setMenuOp('rightMenuClick', null);
    // this.menuService.setMenuOp('overlayMenuActive',false);
    // this.hideOverlayMenu();
  }

  onRightMenuClick(event) {
    this.topbarUserMenuActive = false;
    this.topbarNotificationMenuActive = false;
    this.menuService.setMenuOp('rightMenuClick', true);
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

}
