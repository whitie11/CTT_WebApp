import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';


export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const getIsAuth = createSelector(selectAuthState,
    (state: AuthState) => state.isAuthenticated);

export const getUsername = createSelector(selectAuthState,
    (state: AuthState) => state.user.username);

export const getIsWaiting = createSelector(selectAuthState,
    (state: AuthState) => state.waiting);

export const getToken = createSelector(selectAuthState,
    (state: AuthState) => state.user.token);

export const getRole = createSelector(selectAuthState,
    (state: AuthState) => state.user.role);


