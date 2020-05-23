import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Store } from '@ngrx/store';
import * as fromSelectors from '@app/store/selectors/auth.selectors';
import * as fromStore from '@app/store/app-store.module';
// import { SetErrorMessage } from '../store/actions/auth.actions';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthGuardService implements CanActivate {

    // getState: Observable<any>;
    isAuth: boolean;
    token: string;
    // lo: boolean;
    constructor(
        public router: Router,
        private store: Store<fromStore.AppState>,
        private snackBar: MatSnackBar
    ) { }

    canActivate(): boolean {

        // get observable
        const isAuth$ = this.store.select(fromSelectors.getIsAuth);
        // redirect to sign in page if user is not authenticated
        isAuth$.subscribe(auth => {
            this.isAuth = auth;

        });
        const token$ = this.store.select(fromSelectors.getToken);
        token$.subscribe(res => {
            this.token = res;
        });
        if (!this.isAuth) {
            // this.store.dispatch(new SetErrorMessage('You are not authenticated to view page'));
            this.snackBar.open('You do not have permission, please login', 'Close', {
                duration: 3000,
                verticalPosition: 'top'
            });
            this.router.navigateByUrl('/login');
            return false;
        }
        else if (this.token == null || this.token.length <= 0 || jwtHelper.isTokenExpired(this.token)) {
            //   this.store.dispatch(new SetErrorMessage('There is no token present'));
            this.snackBar.open('Please login to renew token', 'Close', {
                duration: 3000,
                verticalPosition: 'top'
            });
            this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }
}
