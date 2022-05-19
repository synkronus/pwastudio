import { userPermissionsclaims } from 'src/app/modules/auth/models/org.model';
import { UserLoginModel } from 'src/app/modules/auth/models/auth.model';
import { UserPermissionsModel } from 'src/app/modules/auth/models/org.model';
import { BreadCrumbMdl } from 'src/app/common/shell/breadcrumb/bradcrumb.model';

//#region ***** global states *******

// Versioning state
export enum VersionActions {
  GetVersion = 'GET_VERSION',
  SetVersion = 'SET_VERSION',
}
export interface VersionStoreState {
  currentVersion: String;
  upToDate: Boolean;
  date: String;
}

// Right Menu Store
export enum RightMenuActions {
  InitialRightMenu = 'INIT_RIGHT_MENU',
  SetRightMenuOp = 'SET_RIGHT_MENU_OPTION',
}

export interface RightMenuStates {
  notifications: any[];
  wsStatusComm: boolean;
}

// -- Menu
export enum MenuActions {
  InitialState = 'INIT_MENU_STORE',
  GetOp = 'GET_OPTIONS',
  SetOp = 'SET_OPTIONS',
  SetMenu = 'SET_MENU',
}

export interface MenuStates {
  menuMode: String;
  lightMenu: String;
  overlayMenuActive: boolean;
  staticMenuMobileActive: String;
  staticMenuDesktopInactive: String;
  topbarColor: String;
  resetMenu: boolean;
  generalMenu: {};
  menuItems: any[];
  rightMenuClick: boolean;
  onMenuButtonClick: any[];
}

// Store User
export enum AuthStoreActions {
  UserLogin = 'USER_SINGIN',
  Token = 'SET_TOKEN',
  ResfeshToken = 'SET_REFRESH_TOKEN',
  InitAuthStore = 'INIT_AUTH_STORE',
  AuthStatus = 'AUTH_STATUS',
}

export interface AuthStoreState {
  authStatus: boolean;
  userLogin: UserLoginModel;
  token: string;
  refreshToken: string;
}

// user Management
export enum UsrPermissionsStoreActions {
  UserPermisions = 'USER_PERMISSIONS',
  InitPermissionsStore = 'INIT_PERMISSIONS'
}

export interface UsrPermissionsStoreState {
  userPermisions: UserPermissionsModel[];
}

// ModulesFeatures
export enum ModulesFeaturesStoreActions {
  ModulesFeatures = 'MODULES_FEATURES',
  InitModulesFeaturesStore = 'INIT_MODULES_FEATURES'
}

export interface ModulesFeaturesStoreState {
  modulesFeatures: userPermissionsclaims[];
}

// BreadCrumb Store
export enum BreadCrumbStoreActions {
  BreadCrumbAddItem = 'BREARCRUMB_ADD_ITEM',
  BreadCrumbRemoveItem = 'BREARCRUMB_REM_ITEM',
  BreadCrumbInit = 'INIT_BREADCRUMB'
}

export interface BreadCrumbState {
  BreadCrumbItems: BreadCrumbMdl[];
}

//#endregion ***** globals *****


//#region *** Structure ***

export enum StructureDataActions {
  Set = 'SET_STRUCTURE',
  Set_Svc_List = 'SET_SERVICE_LIST',
  Set_Side = 'SET_STRUCTURE_SIDE'
}
export interface StructureDataState {
  List: any[];
  SvcList: {};
  Selected: any;
  SideMenu: boolean;
  ActiveLog: boolean;
}

//#endregion


//#region *** generic ***

export enum GenericDataActions {
  Set = 'SET_DATA'
}
export interface GenericDataState {
  Provincias: any[];
  Categorias: any[];
}

//#endregion
