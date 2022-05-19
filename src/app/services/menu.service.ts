import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { MenuStates, MenuActions } from '../common/store-states';
import { truncate, omit } from 'lodash';
@Injectable({
    providedIn: 'root'
})
export class MenuService extends ObservableStore<MenuStates> {

    constructor() {
        super(
            {
                stateSliceSelector: state => {
                    return {
                        menuMode: (state !== null) ? state.menuMode : 'static',
                        lightMenu: (state !== null) ? state.lightMenu : null,
                        overlayMenuActive: (state !== null) ? state.overlayMenuActive : false,
                        staticMenuDesktopInactive: (state !== null) ? state.staticMenuDesktopInactive : false,
                        staticMenuMobileActive: (state !== null) ? state.staticMenuMobileActive : false,
                        topbarColor: (state !== null) ? state.topbarColor : false,
                        resetMenu: (state !== null) ? state.resetMenu : false,
                        generalMenu: (state !== null) ? state.generalMenu : null,
                        menuItems: (state !== null) ? state.menuItems : null,
                        rightMenuClick: (state !== null) ? state.rightMenuClick : false,
                        onMenuButtonClick: (state !== null) ? state.onMenuButtonClick : null
                    };
                }
            });
        this.InitMenuStoreState();
    }

    private dtTranform(dt) {
        let arr = dt.slice();
        return arr.reduce((z,a,i) => { 
          let x = !!z && z.slice().find( y => y.md_link == a.md_link );
          if (!!x)   
            z.map( y => (y.md_link == a.md_link) ? y['items'].push({ ft_title: truncate(a.ft_title,  { length: 22, 'separator': ''}), ft_icon: `${a.ft_icon}`, routerLink: [`/${a.md_link}/${a.ft_link}`], feature: a.feature }) : y )
         else z.push({md_link: a.md_link, md_title: a.md_title, md_icon: `${a.md_icon}`,  module: `${a.module},`, routerLink:[`/${a.md_link}`], 
                      items:[{ ft_title: truncate(a.ft_title,  { length: 22, 'separator': ''}), ft_icon: `${a.ft_icon}`, routerLink: [`/${a.md_link}/${a.ft_link}`], feature: a.feature }]}); 
          return z;            
        },[])
        .map(o => {return o.items[0]['feature'] === undefined ? omit(o,['items']) : omit(o,['routerLink'])});
      }

    setMenuOp(op, dt, wh?): any {
        switch (op) {
            case 'menuMode':
                this.setState({ menuMode: dt }, MenuActions.SetOp);
                break;
            case 'lightMenu':
                this.setState({ lightMenu: dt }, MenuActions.SetOp);
                break;
            case 'overlayMenuActive':
                this.setState({ overlayMenuActive: dt }, MenuActions.SetOp + '~' + wh);
                break;
            case 'staticMenuDesktopInactive':
                this.setState({ staticMenuDesktopInactive: dt }, MenuActions.SetOp);
                break;
            case 'staticMenuMobileActive':
                this.setState({ staticMenuMobileActive: dt }, MenuActions.SetOp);
                break;
            case 'topbarColor':
                this.setState({ topbarColor: dt }, MenuActions.SetOp);
                break;
            case 'resetMenu':
                this.setState({ resetMenu: dt }, MenuActions.SetOp + '~' + wh);
                break;
            case 'generalMenu':
                this.setState({ generalMenu: dt }, MenuActions.SetOp);
                break;
            case 'rightMenuClick':
                this.setState({ rightMenuClick: dt }, MenuActions.SetOp);
                break;
            case 'onMenuButtonClick':
                this.setState({ onMenuButtonClick: dt }, MenuActions.SetOp + '~' + wh);
                break;
            case 'menuItems':
                let xMenu = this.dtTranform(dt);
                xMenu.unshift({ module: 'Inicio', md_title: 'home', md_icon: 'home', md_link: 'inicio', routerLink: ['/inicio'] });
                this.setState({ menuItems: xMenu }, MenuActions.SetMenu + '~' + wh);
                break;
        }

    }
    
      getMenuOp(op): any {
            switch (op) {
                case 'menuMode':
                    return this.getState().menuMode;
                case 'lightMenu':
                    return this.getState().lightMenu;
                case 'overlayMenuActive':
                    return this.getState().overlayMenuActive;
                case 'staticMenuDesktopInactive':
                    return this.getState().staticMenuDesktopInactive;
                case 'staticMenuMobileActive':
                    return this.getState().staticMenuMobileActive;
                case 'topbarColor':
                    return this.getState().topbarColor;
                case 'resetMenu':
                    return this.getState().resetMenu;
                case 'generalMenu':
                    return this.getState().generalMenu;
                case 'menuItems':
                    return this.getState().generalMenu;
                case 'rightMenuClick':
                    return this.getState().rightMenuClick;
                case 'onMenuButtonClick':
                    return this.getState().onMenuButtonClick;
            }
        }

    InitMenuStoreState(dt?, wh?): void {
        const initialState = {
            menuMode: 'static',
            lightMenu: null,
            overlayMenuActive: true,
            staticMenuMobileActive: null,
            staticMenuDesktopInactive: null,
            topbarColor: null,
            resetMenu: false,
            menuItems: null,
            rightMenuClick: false,
            onMenuButtonClick: null
        };
        this.setState(initialState, MenuActions.InitialState+'~'+wh);
      }

}

