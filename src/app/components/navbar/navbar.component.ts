import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LogOut } from '@app/store/actions/auth.action';

import * as fromStore from '@app/store/app-store.module';
import * as fromSelectors from '@app/store/selectors/auth.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isAuthenticated$: Observable<boolean>;
  username$: Observable<string>;

  constructor(public router: Router, private store: Store<fromStore.AppState>) {
    this.isAuthenticated$ = this.store.select(fromSelectors.getIsAuth);
    this.username$ = this.store.select(fromSelectors.getUsername);
  }

  LogOut(): void {
   this.store.dispatch(new LogOut());
  // this.router.navigateByUrl('/logout');
  }



}
