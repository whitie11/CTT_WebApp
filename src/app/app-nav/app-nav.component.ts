import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromStore from '@app/store/app-store.module';
import { LogOut } from '@app/store/actions/auth.action';
import * as fromAuthSelectors from '@app/store/selectors/auth.selectors';
import { MAT_DRAWER_CONTAINER } from '@angular/material/sidenav/drawer';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;
  username$: Observable<string>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

@ViewChild('drawer') sidenav: MatSidenav;


  constructor(private breakpointObserver: BreakpointObserver, private store: Store<fromStore.AppState>) {
    this.isAuthenticated$ = this.store.select(fromAuthSelectors.getIsAuth);
    this.username$ = this.store.select(fromAuthSelectors.getUsername);
  }
  ngOnInit(): void {
 //   this.sidenav.close();
  }


  LogOut(): void {
    this.store.dispatch(new LogOut());
   // this.router.navigateByUrl('/logout');
   }
}
