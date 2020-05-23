import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { validateWhitespace } from '@app/utilities/validators';
import { Store } from '@ngrx/store';
import { AppState, isWorking } from '../../state';
import { RegUser } from '../../state/admin.actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  roles = [
    { value: 'Guest', viewValue: 'Guest' },
    { value: 'TeamUser', viewValue: 'Team User' },
    { value: 'Admin', viewValue: 'Admin' },
    { value: 'SuperAdmin', viewValue: 'Super Admin' }
  ];

  formdata: FormGroup;
  saving$: Observable<boolean>;

  showLogin = false;
  constructor(private fb: FormBuilder, private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.saving$ = this.store.select(isWorking);

    this.formdata = this.fb.group({
      firstName: this.fb.control('', [Validators.required, validateWhitespace]),
      lastName: this.fb.control('', [Validators.required, validateWhitespace]),
      username: this.fb.control('', [Validators.required, validateWhitespace]),
      password: this.fb.control('', [Validators.required, validateWhitespace]),
      role: new FormControl('TeamUser', [Validators.required])
    });
  }

  register(data: { firstName: string, lastName: string, username: string, password: string, role: string }): void {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: data.password,
      role: data.role
    };
    this.store.dispatch(new RegUser(payload));
  }

  cancel(){
    this.router.navigateByUrl('/admin');
  }
}
