import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '@app/services/auth.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import {
    AuthActionTypes,
    LogIn, LogInSuccess, LogInFailure, LogOut
} from '@app/store/actions/auth.action';
import { User } from '@app/models/user';

@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }


    @Effect()
    Login: Observable<any> = this.actions
        .pipe(ofType(AuthActionTypes.LOGIN))
        .pipe(
            map((action: LogIn) => action.payload),
            switchMap(payload => {
                return this.authService.login(payload)
                    .pipe(
                        map((user: User) => {
                            return new LogInSuccess(user);
                        }),
                        catchError((error) => {
                            this.snackBar.open(error.statusText, 'Close', {
                                duration: 3000,
                                verticalPosition: 'top'
                              });
                            return of(new LogInFailure());
                        }));
            }));

    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        map(() => {
           this.router.navigateByUrl('/home');
        })
    );

    @Effect({ dispatch: false })
    LogOut: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        map(() => {
        this.router.navigateByUrl('/login', { replaceUrl: true });
        })
    );
}
