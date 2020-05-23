import { Action } from '@ngrx/store';
import { User } from '@app/models/user';
import { RegisterDTO } from '@app/models/registerDTO';
import { UpdateUserDTO } from '@app/models/updateUserDTO';

export enum AdminActions {
    LOAD_USERS = '[admin] Load users',
    LOAD_USERS_SUCCESS = '[admin] Load users success',
    LOAD_USERS_FAIL = '[users] Load users fail',
    LOAD_USER = '[admin] Load user',
    LOAD_USER_SUCCESS = '[admin] Load user success',
    LOAD_USER_FAIL = '[admin] Load user fail',
    SET_SELECTED_USER = '[admin] set selected user',
    REG_USER = '[admin] Register new user',
    REG_USER_SUCCESS = '[admin] Register new user success',
    REG_USER_FAIL = '[admin] Register new user fail',
    UPDATE_USER = '[admin] Update user',
    UPDATE_USER_SUCCESS = '[admin] Update user success',
    UPDATE_USER_FAIL = '[admin] Update user fail'
}

export class LoadUsers implements Action {
    readonly type = AdminActions.LOAD_USERS;
}
export class LoadUsersSuccess implements Action {
    readonly type = AdminActions.LOAD_USERS_SUCCESS;
    constructor(public payload: any){}
}
export class LoadUsersFail implements Action {
    readonly type = AdminActions.LOAD_USERS_FAIL;
}

export class LoadUser implements Action {
    readonly type = AdminActions.LOAD_USER;
    constructor(public payload: number){}
}
export class LoadUserSuccess implements Action {
    readonly type = AdminActions.LOAD_USER_SUCCESS;
    constructor(public payload: User){}
}
export class LoadUserFail implements Action {
    readonly type = AdminActions.LOAD_USER_FAIL;
}

export class SetSelectedUser implements Action {
    readonly type = AdminActions.SET_SELECTED_USER;
    constructor(public payload: User){}
}

export class RegUser implements Action {
    readonly type = AdminActions.REG_USER;
    constructor(public payload: RegisterDTO ){}
}

export class RegUserSuccess implements Action {
    readonly type = AdminActions.REG_USER_SUCCESS;
}

export class RegUserFail implements Action {
    readonly type = AdminActions.REG_USER_FAIL;
}

export class UpdateUser implements Action {
    readonly type = AdminActions.UPDATE_USER;
    constructor(public payload: UpdateUserDTO ){}
}

export class UpdateUserSuccess implements Action {
    readonly type = AdminActions.UPDATE_USER_SUCCESS;
    constructor(public payload: any ){}
}

export class UpdateUserFail implements Action {
    readonly type = AdminActions.UPDATE_USER_FAIL;
}


export type AdminAction =
LoadUsers |
LoadUsersSuccess |
LoadUsersFail |
LoadUser |
LoadUserSuccess |
LoadUserFail |
SetSelectedUser |
RegUser |
RegUserSuccess |
RegUserFail |
UpdateUser |
UpdateUserSuccess |
UpdateUserFail;

