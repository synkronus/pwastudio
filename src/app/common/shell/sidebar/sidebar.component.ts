import { PagesComponent } from 'src/app/core/pages.component';
import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem } from 'primeng/api';

import { SubSink } from 'subsink';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ScrollPanel } from 'primeng/scrollpanel';
import { UserLoginModel } from 'src/app/modules/auth/models/auth.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MenuService } from '../../shared/services/menu.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    animations: [
        trigger('inline', [
            state('hiddenAnimated', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visibleAnimated', style({
                height: '*',
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMenuComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() reset: boolean;
    model: any[] = [];
    private confMenu = [];

    // User Login
    usrLgn: UserLoginModel;

    inlineUserMenuActive = false;
    @ViewChild('layoutMenuScroller', { static: true }) layoutMenuScrollerViewChild: ScrollPanel;

    sidebar$: Observable<any[]>;
    menuMode = 'static';
    overlayMenuActive: boolean;
    staticMenuDesktopInactive: boolean;
    subsink = new SubSink();

    constructor(public app: PagesComponent, private menuService: MenuService,
        private authService: AuthService, private router: Router,
        private translate: TranslateService) {
    }

    ngOnInit() {

        this.subsink.sink = this.authService.stateWithPropertyChanges.subscribe(
            (state) => {
                if (!!state && state.stateChanges.hasOwnProperty("userLogin")) {
                    this.usrLgn = state.stateChanges.userLogin;
                }
            });

        this.usrLgn = this.authService.GetStateLoginOp("userLogin");

        this.subsink.sink = this.menuService.stateWithPropertyChanges.subscribe(state => {
            if (!!state && state.stateChanges.hasOwnProperty("menuItems")) {
                if (!!state.stateChanges.menuItems) {
                    this.model = this.confMenu.slice();
                    state.stateChanges.menuItems.forEach(d => this.model.push(d));
                    this.setTranslations();
                }
                else this.router.navigate(["/login"]);
            }
        });

        this.subsink.sink = this.menuService.stateWithPropertyChanges.subscribe(state => {
            if (!!state && state.stateChanges.hasOwnProperty("overlayMenuActive")) {
                if (!state.stateChanges.overlayMenuActive)
                    this.reset = true;
            }
        });
    }

    setTranslations() {
        this.model.forEach(md => {
            if (md.items) {
                md.items.forEach(ft => {
                    this.subsink.sink = this.translate.get(`menu.${md.md_title}.${ft.ft_title}`).subscribe(x => ft.ft_title = x);
                });
            }
            this.subsink.sink = this.translate.get(`menu.${md.md_title}.title`).subscribe(x => md.md_title = x);
        });
    }

    ngOnDestroy(): void {
        this.subsink.unsubscribe();
    }

    changeMenuMode(menuMode: string) {
        this.menuMode = menuMode;
        let aux = (menuMode == 'static') ? true : false;
        let obj = { menuMode, staticMenuDesktopInactive: false, overlayMenuActive: aux };
        this.menuService.setMenuOp('generalMenu', obj);
        this.staticMenuDesktopInactive = false;
        this.overlayMenuActive = aux;
    }

    ngAfterViewInit() {
        setTimeout(() => { this.layoutMenuScrollerViewChild.moveBar(); }, 100);
    }

    changeTheme(theme: string) {
        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';
        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        themeLink.href = 'assets/theme/' + 'theme-' + theme + '.css';
    }

    changeTopbarColor(topbarColor, logo) {
        this.app.topbarColor = topbarColor;
        const topbarLogoLink: HTMLImageElement = document.getElementById('topbar-logo') as HTMLImageElement;
        topbarLogoLink.src = 'assets/layout/images/' + logo + '.svg';
    }

    onMenuClick(event) {
        this.menuService.setMenuOp('resetMenu', false, "sidebar::onMenuClick");
        this.reset = false;

    }
}

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-submenu]',
    /* tslint:enable:component-selector */
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass" *ngIf="child.visible === false ? false : true">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)"
                   *ngIf="!child.routerLink" [ngClass]="child.styleClass"
                   [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                     <i class="material-icons pi-fw" style="font-size:22px;color:#65656a;vertical-align: middle">{{child.md_icon}}</i>
                    <span class="layout-menuitem-text">{{child.md_title}}</span>
                    <i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="child.items"></i>
                </a>
                <a (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)" *ngIf="child.routerLink"
                   [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink" [fragment]="child.fragment"
                   [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i class="material-icons pi-fw" style="font-size:22px;color:#65656a;vertical-align: middle">{{child.ft_icon || child.md_icon}}</i>
                    <span class="layout-menuitem-text">{{child.ft_title || child.md_title}}</span>
                    <i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="child.items"></i>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">{{child.md_title}}</div>
                </div>
                <ul app-submenu [item]="child" *ngIf="child.items" [visible]="isActive(i)" [reset]="reset" [parentActive]="isActive(i)"
                    [@children]="(app.isSlim())&&root ? isActive(i) ?
                    'visible' : 'hidden' : isActive(i) ? 'visibleAnimated' : 'hiddenAnimated'"></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                height: '*',
                'z-index': 100
            })),
            state('hidden', style({
                height: '0px',
                'z-index': '*'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;
    @Input() root: boolean;
    @Input() visible: boolean;
    _parentActive: boolean;
    _reset: boolean;
    activeIndex: number;

    constructor(public app: PagesComponent, public appMenu: AppMenuComponent) { }

    itemClick(event: Event, item: MenuItem, index: number) {
        if (this.root) {
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item });
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {
                this.appMenu.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (this.app.isSlim()) {
                this.app.resetMenu = true;
            } else {
                this.app.resetMenu = false;
            }

            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
            this.app.menuHoverActive = !this.app.menuHoverActive;
            this.app.unblockBodyScroll();
        }
    }

    onMouseEnter(index: number) {
        if (this.root && this.app.menuHoverActive && (this.app.isSlim())
            && !this.app.isMobile() && !this.app.isTablet()) {
            this.activeIndex = index;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;
        if (this._reset && (this.app.isSlim())) {
            this.activeIndex = null;
        }
    }

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }
    set parentActive(val: boolean) {
        this._parentActive = val;
        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
}
