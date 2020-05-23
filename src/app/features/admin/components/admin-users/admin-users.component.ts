import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { LoadUsers, LoadUser, SetSelectedUser } from '../../state/admin.actions';
import { Observable } from 'rxjs';
import { User } from '@app/models/user';
import { AdminState } from '../../state/admin.reducer';
import { isWorking, getSelectedUser, getAllUsers } from '../../state';
import * as fromStore from '@app/store/selectors/auth.selectors';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  // @ViewChild(MatPaginator, { static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<User>;

  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  users$: Observable<User[]>;
  users: User[];

  loading$: Observable<boolean>;
  loading: boolean;

  dataSource = new MatTableDataSource(this.users);

  constructor(
    private store: Store<AdminState>,
    private router: Router
    ) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'username',
    'firstName',
    'lastName',
    'role'
  ];

  ngOnInit(): void {

    this.store.dispatch(new LoadUsers());

    this.loading$ = this.store.select(isWorking);
    this.loading$.subscribe(l => this.loading = l);

    this.users$ = this.store.select(getAllUsers);

    this.users$.subscribe((list) => {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.table.dataSource = this.dataSource;
    });
  }

  getRecord(user: User) {
    this.store.dispatch(new SetSelectedUser(user));
    this.router.navigateByUrl('/admin/user');
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
