import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { MenuService } from '../common/shared/services/menu.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy  {

  subsink = new SubSink();
  menuMode =  (this.isDesktop) ? 'static' : 'overlay' ;
  overlayMenuActive: boolean = !!this.isDesktop;
  staticMenuDesktopInactive: boolean;
  staticMenuMobileActive: boolean;
  layoutMenuScroller: HTMLDivElement;
  lightMenu = true;
  topbarColor = 'layout-topbar-blue';
  menuClick: boolean;
  userMenuClick: boolean;
  notificationMenuClick: boolean;
  rightMenuClick: boolean;
  resetMenu: boolean;
  menuHoverActive: boolean;
  topbarUserMenuActive: boolean;
  topbarNotificationMenuActive: boolean;
  rightPanelMenuActive: boolean;
  inlineUser: boolean;
  isRTL: boolean;


  constructor(private menuService: MenuService) {  }


  ngOnInit(): void {

    this.subsink.sink = this.menuService.stateWithPropertyChanges
        .subscribe(state => {
            if(!!state && state.stateChanges.hasOwnProperty("generalMenu")){
                let gm = state.stateChanges.generalMenu;
                this.menuMode = gm['menuMode'] == 'overlay' ? 'static' : gm['menuMode'] ;
                this.overlayMenuActive = gm['overlayMenuActive'];
                this.staticMenuDesktopInactive = gm['staticMenuDesktopInactive'];
                this.menuService.setMenuOp('overlayMenuActive',gm['overlayMenuActive'],"pages::ngOnInit:1");
            }
            if(!!state && state.stateChanges.hasOwnProperty("resetMenu")){
                let rm = state.stateChanges.resetMenu;
                this.menuClick = true;
                this.resetMenu = rm;
            }
            if(!!state && state.stateChanges.hasOwnProperty("rightMenuClick")){
                let rkm = state.stateChanges.rightMenuClick;
                this.rightMenuClick = rkm;
                // this.hideOverlayMenu();
            }
            if(!!state && state.stateChanges.hasOwnProperty("onMenuButtonClick")){
                if(!state.stateChanges.onMenuButtonClick) return;
                let mclk = state.stateChanges.onMenuButtonClick;
                // let overLayActive = this.menuService.getMenuOp("overlayMenuActive");
                this.menuClick = mclk['menuClick'];
                this.topbarUserMenuActive = mclk['topbarUserMenuActive'];
                this.topbarNotificationMenuActive = mclk['topbarNotificationMenuActive']; // false when side menu out
                this.rightPanelMenuActive = mclk['rightPanelMenuActive'];
                // let x = this.menuService.getMenuOp("generalMenu");
                // if (this.isOverlay()) {
                //     this.overlayMenuActive = true;
                //     overLayActive = true;
                // }else if (this.isStatic()) {
                //     overLayActive = false;
                //     this.overlayMenuActive = false;
                // }
                if (this.isDesktop()) {
                    this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
                } else {
                    this.staticMenuMobileActive = !this.staticMenuMobileActive;
                    if (this.staticMenuMobileActive) {
                        this.blockBodyScroll();
                    } else {
                        this.unblockBodyScroll();
                    }
                }

                this.menuMode =  (this.isDesktop) ? 'static' : 'overlay' ;
                this.overlayMenuActive = !!this.isDesktop;

                // this.menuMode = (overLayActive) ? 'static' : 'overlay' ;
                this.menuService.setMenuOp('overlayMenuActive',this.overlayMenuActive,"pages::ngOnInit:2");
            }

            if(!!state && state.stateChanges.hasOwnProperty("overlayMenuActive")){
                if(!state.stateChanges.overlayMenuActive)
                    // this.menuMode = 'overlay';
                    this.menuMode =  (this.isDesktop) ? 'static' : 'overlay' ;
                // else {
                //     let x = this.menuService.getMenuOp("generalMenu");
                //     if(!x) return;
                //     this.menuMode = x.menuMode;
                // }
            }
        });
    }



    ngOnDestroy(): void {
        this.subsink.unsubscribe();
    }

    onLayoutCleanUp() {
        this.menuService.setMenuOp('resetMenu',false,"pages::onLayoutCleanUp");
    }

  onLayoutClick() {
      if (!this.userMenuClick) {
          this.topbarUserMenuActive = false;
          this.menuService.setMenuOp('topbarUserMenuActive',false);
      }

      if (!this.notificationMenuClick) {
          this.topbarNotificationMenuActive = false;
          this.menuService.setMenuOp('topbarNotificationMenuActive',false);
      }

      if (!this.rightMenuClick) {
          this.rightPanelMenuActive = false;
          this.menuService.setMenuOp('rightPanelMenuActive',false);
      }

      if (!this.menuClick) {
          if ( this.isSlim()) {
              this.resetMenu = true;
            //   this.menuService.setMenuOp('resetMenu',true,"pages::onLayoutClick");
          }

        //   if (this.overlayMenuActive || this.staticMenuMobileActive) {
        //       this.hideOverlayMenu();
        //   }

          this.menuHoverActive = false;
          this.unblockBodyScroll();
      }

      this.userMenuClick = false;
      this.rightMenuClick = false;
      this.notificationMenuClick = false;
      this.menuClick = false;
  }

  onMenuButtonClick(event) {
      this.menuClick = true;
      this.topbarUserMenuActive = false;
      this.topbarNotificationMenuActive = false;
      this.rightPanelMenuActive = false;

      if (this.isOverlay()) {
          this.overlayMenuActive = !this.overlayMenuActive;
      }

      if (this.isDesktop()) {
          this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
      } else {
          this.staticMenuMobileActive = !this.staticMenuMobileActive;
          if (this.staticMenuMobileActive) {
              this.blockBodyScroll();
          } else {
              this.unblockBodyScroll();
          }
      }
      event.preventDefault();
  }

//   onMenuClick($event) {
//       this.menuClick = true;
//       this.resetMenu = false;
//       this.menuService.setMenuOp('resetMenu',false);
//   }

//   onTopbarUserMenuButtonClick(event) {
//       this.userMenuClick = true;
//       this.topbarUserMenuActive = !this.topbarUserMenuActive;

//       this.hideOverlayMenu();

//       event.preventDefault();
//   }

//   onTopbarNotificationMenuButtonClick(event) {
//       this.notificationMenuClick = true;
//       this.topbarNotificationMenuActive = !this.topbarNotificationMenuActive;
//       this.hideOverlayMenu();
//       event.preventDefault();
//   }

//   onRightMenuClick(event) {
//       this.rightMenuClick = true;
//       this.rightPanelMenuActive = !this.rightPanelMenuActive;

//       this.hideOverlayMenu();

//       event.preventDefault();
//   }

  onTopbarSubItemClick(event) {
      event.preventDefault();
  }

//   isHorizontal() {
//       return this.menuMode === 'horizontal';
//   }

  isSlim() {
      return this.menuMode === 'slim';
  }

  isOverlay() {
      return this.menuMode === 'overlay';
  }

  isStatic() {
      return this.menuMode === 'static';
  }

  isMobile() {
      return window.innerWidth < 1025;
  }

  isDesktop() {
      return window.innerWidth > 896;
  }

  isTablet() {
      const width = window.innerWidth;
      return width <= 1024 && width > 640;
  }

  hideOverlayMenu() {
      this.overlayMenuActive = false;
      this.menuService.setMenuOp('overlayMenuActive',false,"pages::hideOverlayMenu");
      this.staticMenuMobileActive = false;
      this.menuService.setMenuOp('staticMenuMobileActive',false,"pages::hideOverlayMenu");
  }

//   changeMenuMode(menuMode: string) {
//       this.menuMode = menuMode;
//       this.menuService.setMenuOp('menuMode',menuMode);
//       this.staticMenuDesktopInactive = false;
//       this.menuService.setMenuOp('staticMenuDesktopInactive',false);
//       this.overlayMenuActive = false;
//       this.menuService.setMenuOp('overlayMenuActive',false,"pages::changeMenuMode");
//   }

  blockBodyScroll(): void {
      if (document.body.classList) {
          document.body.classList.add('blocked-scroll');
      } else {
          document.body.className += ' blocked-scroll';
      }
  }

  unblockBodyScroll(): void {
      if (document.body.classList) {
          document.body.classList.remove('blocked-scroll');
      } else {
          document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
              'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
  }
}
