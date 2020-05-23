import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';

import { ApiService } from '@app/services/api.service';
import { AuthService } from '@app/services/auth.service';
import { Observable, of } from 'rxjs';
import {
    AdminActions, LoadUser, LoadUserSuccess, LoadUserFail, LoadUsersSuccess, LoadUsersFail,
    RegUser, RegUserSuccess, RegUserFail,
    UpdateUser, UpdateUserFail, UpdateUserSuccess
} from './admin.actions';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { User } from '@app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminState } from './admin.reducer';
import { Router } from '@angular/router';

@Injectable()
export class AdminEffects {
    constructor(
        private action$: Actions,
        private store: Store<AdminState>,
        private apiService: ApiService,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router,
    ) { }

    @Effect()
    loadUser$: Observable<any> = this.action$
        .pipe(ofType<LoadUser>(AdminActions.LOAD_USER))
        .pipe(
            map((action: LoadUser) => action.payload),
            switchMap(id => this.authService.getUser(id).pipe(
                map((user: User) => new LoadUserSuccess(user)),
                catchError(err => {
                    this.snackBar.open(err, 'Close', {
                        duration: 3000,
                        verticalPosition: 'top'
                    });

                    return of(new LoadUserFail());
                })
            ))
        );


    @Effect()
    loadUsers$: Observable<Action> = this.action$.pipe(
        ofType(AdminActions.LOAD_USERS),
        mergeMap(action =>
            this.authService.getAllUsers().pipe(
                map(users => new LoadUsersSuccess(users)),
                catchError(err => {
                    this.snackBar.open(err.statusText, 'Close', {
                        duration: 3000,
                        verticalPosition: 'top'
                    });
                    return of(new LoadUsersFail());
                })
            )
        ));


    @Effect()
    regUser$: Observable<any> = this.action$
        .pipe(ofType(AdminActions.REG_USER))
        .pipe(
            map((action: RegUser) => action.payload),
            switchMap(newUser => {
                return this.authService.register(newUser)
                    .pipe(
                        map(() => {
                            this.showToast('New User Saved');
                            return new RegUserSuccess();
                        }),
                        catchError(err => {
                            this.showToast(err.error.message);
                            return of(new RegUserFail());
                        })
                    );
            })
        );


    @Effect()
    UpdateUser$: Observable<any> = this.action$
        .pipe(ofType(AdminActions.UPDATE_USER))
        .pipe(
            map((action: UpdateUser) => action.payload),
            switchMap(data => {
                return this.authService.update(data.id, data.user)
                    .pipe(
                        map((res) => {
                            this.showToast('User Details Updated');
                            return new UpdateUserSuccess(res);
                        }),
                        catchError(err => {
                            this.showToast(err.error.message);
                            return of(new UpdateUserFail());
                        })
                    );
            })
        );





    @Effect({ dispatch: false })
    RegUserSuccess: Observable<any> = this.action$.pipe(
        ofType(AdminActions.REG_USER_SUCCESS),
        map(() => {
            this.router.navigateByUrl('/admin');
        })
    );

    @Effect({ dispatch: false })
    UpdateUserSuccess: Observable<any> = this.action$.pipe(
        ofType(AdminActions.UPDATE_USER_SUCCESS),
        map(() => {
            this.router.navigateByUrl('/admin');
        })
    );

    showToast(message: string) {
        this.snackBar.open(message, 'Close', {
            duration: 3000,
            verticalPosition: 'top'
        });
    }
}
