import { Action } from '@ngrx/store';
import { Clinic } from '@app/models/clinic';
import { DiaryControls } from '@app/models/diaryControls';


export enum DiaryActions {
    LOAD_DIARY = '[diary] load diary',
    LOAD_DIARY_SUCCESS = '[diary] load diary success',
    LOAD_DIARY_FAIL = '[diary] load diary fail',
    SAVE_SELECTED_CLINIC = '[diary] save selected clinic',
    SAVE_SELECTED_DATE = '[diary] save selected date',
    SAVE_DIARYCONTROLS = '[diary] save diary controls'
}

export class LoadDiary implements Action {
    readonly type = DiaryActions.LOAD_DIARY;
    constructor(public payload: any){}
}
export class LoadDiarySuccess implements Action {
    readonly type = DiaryActions.LOAD_DIARY_SUCCESS;
    constructor(public payload: any){}
}
export class LoadDiaryFail implements Action {
    readonly type = DiaryActions.LOAD_DIARY_FAIL;
}
export class SaveClinic implements Action {
    readonly type = DiaryActions.SAVE_SELECTED_CLINIC;
    constructor(public payload: Clinic){}
}
export class SaveDate implements Action {
    readonly type = DiaryActions.SAVE_SELECTED_DATE;
    constructor(public payload: Date){}
}
// export class LoadClinicList implements Action {
//     readonly type = DiaryActions.LOAD_CLINIC_LIST;
// }
// export class LoadClinicListSuccess implements Action {
//     readonly type = DiaryActions.LOAD_CLINIC_LIST_SUCCESS;
//     constructor(public payload: any){}
// }
// export class LoadClinicListFail implements Action {
//     readonly type = DiaryActions.LOAD_CLINIC_LIST_FAIL;
// }
export class SaveDiaryControls implements Action {
    readonly type = DiaryActions.SAVE_DIARYCONTROLS;
    constructor(public payload: DiaryControls){}
}

export type DiaryAction =
LoadDiary |
LoadDiarySuccess |
LoadDiaryFail |
SaveClinic |
SaveDate |
// LoadClinicList |
// LoadClinicListSuccess |
// LoadClinicListFail |
SaveDiaryControls
;
