import { Action } from '@ngrx/store';
import { AuthDTO } from '@app/models/auth';
import { User } from '@app/models/user';
export enum AuthActionTypes {
  LOGIN = '[AUTH] Login',
  LOGIN_SUCCESS = '[AUTH] Login Success',
  LOGIN_FAILURE = '[AUTH] Login Failure',
  LOGOUT = '[AUTH] Logout',
  SET_ERROR_MESSAGE = '[AUTH] Set Error Message',
  CLEAR_ERROR_MESSAGE = '[AUTH] Clear Error Message'
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: AuthDTO) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;

}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}


export type authAction =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | LogOut
  ;

