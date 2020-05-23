import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from '@app/services/patient.service';
import { Patient } from '@app/models/patient';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<Patient>;

  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  pts$: Observable<Patient[]>;
  pts: Patient[];

  dataSource = new MatTableDataSource(this.pts);
  filter: any;
  state$: any;
  navParams: any;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  displayedColumns = [
    'id',
    'firstName',
    'lastName',
    'dob',
    'nhsNo',
    'cpmsNo',
    'notes',
    'isOpen',
    'locality'
  ];

  ngOnInit(): void {
    // TODO get list of patients from service
    this.pts$ = this.patientService.getAllPts();
    this.pts$.subscribe(list => {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        if (property === 'locality'){
          return item.locality.name;
        } else {
          return item[property];
        }
};

      this.table.dataSource = this.dataSource;
      this.state$ = this.route.paramMap
        .pipe(map(() => window.history.state)).subscribe((s) => {
          this.navParams = s;
        });


      if (this.navParams.data) {
        this.filter = this.navParams.data;
        this.doFilter(this.navParams.data);
      }

    });
  }

  showPt(pt: Patient) {
    // this.store.dispatch(new SetSelectedUser(user));
    // this.router.navigateByUrl('/admin/user');
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


}
