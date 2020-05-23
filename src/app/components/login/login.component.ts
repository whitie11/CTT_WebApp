import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthDTO } from '@app/models/auth';
import { AppState } from '@app/store/app-store.module';
import { LogIn } from '@app/store/actions/auth.action';
import { validateWhitespace } from '@app/utilities/validators';
import { getIsWaiting } from '@app/store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formdata: FormGroup;
  waiting$: Observable<boolean>;
  // user: AuthDTO = new AuthDTO();
  getState: Observable<any>;
  errorMessage: string | null;
  showLogin = false;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    //   this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    // this.getState.subscribe((state) => {
    //   this.errorMessage = state.errorMessage;
    // });

    // this.store.subscribe(state => (this.waiting$ = state.auth.waiting ));

    this.waiting$ = this.store
      .pipe(
        select(getIsWaiting)
      );

    this.formdata = this.fb.group({
      username: this.fb.control('ian.white', [Validators.required, validateWhitespace]),
      password: this.fb.control('P@ssw0rd1', [Validators.required, validateWhitespace])
    });
  }

  login() {
    const val = this.formdata.getRawValue() as AuthDTO;
    this.store.dispatch(new LogIn(val));
  }

  enableLogin() {
this.showLogin = true;
  }
}
