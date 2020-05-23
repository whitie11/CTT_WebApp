import { User } from '@app/models/user';

import * as Store from '@app/store/app-store.module';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import * as fromAdmin from './admin.reducer';
import * as fromRoot from '@app/store/reducers/auth.reducer';

export interface AdminState {
    users: fromAdmin.AdminState;
}

export interface AppState extends Store.AppState {
    users: AdminState;
}

export const reducers: ActionReducerMap<AdminState> = {
    users: fromAdmin.adminReducer,
};




export const selectAdminState = createFeatureSelector<AdminState>('admin');

export const isWorking = createSelector(selectAdminState,
    (state: AdminState) => state.users.loading);

export const getSelectedUser = createSelector(selectAdminState,
    (state: AdminState) => state.users.selectedUser);

export const getAllUsers = createSelector(selectAdminState,
    (state: AdminState) => state.users.users);





