import { ListState } from '../reducers/list.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export const selectListState = createFeatureSelector<ListState>('list');

export const getClinicList = createSelector(selectListState,
    (state: ListState) => state.clinicList);

export const getListLoading = createSelector(selectListState,
    (state: ListState) => state.listLoading);

export const getLocalityList = createSelector(selectListState,
    (state: ListState) => state.localityList);

export const getLocListLoading = createSelector(selectListState,
    (state: ListState) => state.locListLoading);

export const getApptTypes = createSelector(selectListState,
    (state: ListState) => state.apptTypeList);

export const getApptTypeLoading = createSelector(selectListState,
    (state: ListState) => state.apptTypeLoading);

