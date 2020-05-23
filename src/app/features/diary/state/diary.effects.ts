import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { LoadDiary, DiaryActions, LoadDiarySuccess, LoadDiaryFail } from './diary.actions';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { DiaryService } from '@app/services/DIaryService';
import { DiaryRow } from '@app/models/diaryListItem';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from '@ngrx/store';
import { ListService } from '@app/services/list.service';



@Injectable()
export class DiaryEffects {
    constructor(
        private action$: Actions,
        private diaryService: DiaryService,
        private snackBar: MatSnackBar,
        private listService: ListService
    ) { }


    @Effect()
    loadDiary$: Observable<any> = this.action$
        .pipe(ofType<LoadDiary>(DiaryActions.LOAD_DIARY))
        .pipe(
            map((action: LoadDiary) => action.payload),
            switchMap(req => this.diaryService.getDiaryPage(req).pipe(
                map((dra: DiaryRow[]) => new LoadDiarySuccess(dra)),
                catchError(err => {
                    this.snackBar.open(err, 'Close', {
                        duration: 3000,
                        verticalPosition: 'top'
                    });
                    return of(new LoadDiaryFail());
                })
            )));

}
