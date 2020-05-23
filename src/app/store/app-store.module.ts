import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {
          RouterReducerState,
          routerReducer,
          StoreRouterConnectingModule,
          RouterStateSerializer
        } from '@ngrx/router-store';

import { errorReducer, ErrorState } from './reducers/errors.reducer';
import { AuthEffects } from './effects/auth.effects';
import { ListEffects } from './effects/list.effects';
import { AuthState, authReducer } from '@app/store/reducers/auth.reducer';
import { ListState, listReducer } from '@app/store/reducers/list.reducer';
import { RouterStateUrl, CustomSerializer } from './reducers/router.reducer';

export interface AppState {
  error: ErrorState;
  auth: AuthState;
  list: ListState;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
  error: errorReducer,
  auth: authReducer,
  list: listReducer,
  router: routerReducer
};

export const effects = [
  AuthEffects,
  ListEffects
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    }
  ]
})
export class AppStoreModule { }
