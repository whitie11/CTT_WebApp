import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { validateWhitespace } from '@app/utilities/validators';
import { Store } from '@ngrx/store';
import { AppState, isWorking, getSelectedUser } from '../../state';
import { RegUser, RegUserSuccess, UpdateUser } from '../../state/admin.actions';
import { Observable } from 'rxjs';
import { User } from '@app/models/user';
import { UpdateUserDTO } from '@app/models/updateUserDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit  {

  roles = [
    { value: 'Guest', viewValue: 'Guest' },
    { value: 'TeamUser', viewValue: 'Team User' },
    { value: 'Admin', viewValue: 'Admin' },
    { value: 'SuperAdmin', viewValue: 'Super Admin' }
  ];

  formdata: FormGroup;
  saving$: Observable<boolean>;
  selectedUser: User;
  showLogin = false;


  constructor(private fb: FormBuilder, private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.saving$ = this.store.select(isWorking);
    this.store.select(getSelectedUser).subscribe(
      user => this.selectedUser = user
    //  this.queryForm.patchValue({pcode: this.item.productCode})
    );

    this.formdata = this.fb.group({
      firstName: this.fb.control(this.selectedUser.firstName, [Validators.required, validateWhitespace]),
      lastName: this.fb.control(this.selectedUser.lastName, [Validators.required, validateWhitespace]),
      username: this.fb.control(this.selectedUser.username, [Validators.required, validateWhitespace]),
      password: this.fb.control(''),
      role: new FormControl(this.selectedUser.role, [Validators.required])
    });
  }

  update(data: { firstName: string, lastName: string, username: string, password: string, role: string }): void {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: data.password,
      role: data.role
    };
    const dto: UpdateUserDTO = {
      id: this.selectedUser.id,
      user: payload
     };

    this.store.dispatch(new UpdateUser(dto));
  }

  cancel(){
    this.router.navigateByUrl('/admin');
  }

  // TODO clear selecteduser from store when moving on
}
