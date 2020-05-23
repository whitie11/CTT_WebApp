import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListService } from '@app/services/list.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
    ListActionTypes,
    LoadClinicListSuccess,
    LoadClinicListFail,
    LoadLocalityListSuccess,
    LoadLocalityListFail,
    LoadApptTypeSuccess,
    LoadApptTypeFail
} from '../actions/list.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';





@Injectable()
export class ListEffects {
    constructor(
        private action$: Actions,
        private snackBar: MatSnackBar,
        private listService: ListService
    ) { }

    @Effect()
    loadClinics$: Observable<Action> = this.action$.pipe(
        ofType(ListActionTypes.LOAD_CLINIC_LIST),
        mergeMap(action =>
            this.listService.getClinics().pipe(
                map(clinics => new LoadClinicListSuccess(clinics)),
                catchError(err => {
                    this.snackBar.open(err.statusText, 'Close', {
                        duration: 3000,
                        verticalPosition: 'top'
                    });
                    return of(new LoadClinicListFail());
                })
            )
        )
    );

    @Effect()
    loadLocalities$: Observable<Action> = this.action$.pipe(
        ofType(ListActionTypes.LOAD_LOCALITY_LIST),
        mergeMap(action =>
            this.listService.getLocalities().pipe(
                map(locs => new LoadLocalityListSuccess(locs)),
                catchError(err => {
                    this.snackBar.open(err.statusText, 'Close', {
                        duration: 3000,
                        verticalPosition: 'top'
                    });
                    return of(new LoadLocalityListFail());
                })
            )
        )
    );

    @Effect()
    loadApptTypes$: Observable<Action> = this.action$.pipe(
        ofType(ListActionTypes.LOAD_APPT_TYPE),
        mergeMap(action =>
            this.listService.getApptTypes().pipe(
                map(types => new LoadApptTypeSuccess(types)),
                catchError(err => {
                    this.snackBar.open(err.statusText, 'Close', {
                        duration: 3000,
                        verticalPosition: 'top'
                    });
                    return of(new LoadApptTypeFail());
                })
            )
        )
    );



}
