import * as Store from '@app/store/app-store.module';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import * as fromDiaryReducer from './diary.reducer';


export interface DiaryState {
    diary: fromDiaryReducer.DiaryState;
}

export interface AppState extends Store.AppState {
    diary: DiaryState;
}

export const reducers: ActionReducerMap<DiaryState> = {
    diary: fromDiaryReducer.diaryReducer,
};

export const selectDiaryState = createFeatureSelector<DiaryState>('diary');

export const isLoading = createSelector(selectDiaryState,
    (state: DiaryState) => state.diary.diaryLoading);

export const getDiaryPage = createSelector(selectDiaryState,
    (state: DiaryState) => state.diary.diaryRows);

export const getDate = createSelector(selectDiaryState,
    (state: DiaryState) => state.diary.selectedDate);

export const getClinic = createSelector(selectDiaryState,
    (state: DiaryState) => state.diary.selectedClinic);

export const getDiaryControls = createSelector(selectDiaryState,
        (state: DiaryState) => state.diary.diaryControls);


