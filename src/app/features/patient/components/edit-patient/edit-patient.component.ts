import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { validateWhitespace } from '@app/utilities/validators';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app-store.module';
import { Locality } from '@app/models/locality';
import { Observable, from, throwError } from 'rxjs';
import { getLocalityList } from '@app/store/selectors/list.selectors';
import { Patient, PtEditDTO, PtNewDTO } from '@app/models/patient';
import { PatientService } from '@app/services/patient.service';
import { catchError, tap, map, filter } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {

  ptForm: FormGroup;

  localities: Locality[];
  localities$: Observable<Locality[]>;

  NHSNoValidator = /^(\d{3}) ?(\d{3}) ?(\d{4})$/g;
  DobValidator = /^(\d{2})\/(\d{2})\/(\d{4})/g;
  errors: any;
  state: any;
  activatedRoute: any;



  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.state = this.router.getCurrentNavigation().extras.state.data;
  }

  ngOnInit(): void {
    this.reactiveForm();
    this.localities$ = this.store.select(getLocalityList);
    this.localities$.subscribe(l => this.localities = l);
  }

  getDateString(date: Date) {
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  reactiveForm() {
    this.ptForm = this.fb.group({
      patientId: [this.state.patientId],
      firstName: [this.state.firstName],
      lastName: [this.state.lastName],
      dob: [this.getDateString(this.state.dob)],
      nhsNo: [this.state.nhsNo],
      cpmsNo: [this.state.cpmsNo],
      localityId: [this.state.locality.localityId, [Validators.required]],
      notes: [this.state.notes],
      isOpen: [this.state.isOpen]
    });
  }

  update(data: PtNewDTO) {
    const editData = {
      patientId: data.patientId,
      localityId: data.localityId,
      notes: data.notes,
      isOpen: data.isOpen
    };
    const res = this.patientService.Update(editData).subscribe(
      result => {
        // Handle result
        console.log(result);
      },
      error => {
        this.errors = error;
        this.snackBar.open(error, 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
        this.snackBar.open('Patient successfully updated to Database', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.router.navigateByUrl('/patients', { state: { data: data.nhsNo } });
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/patients');
  }

  handleEnterKeyPress(event) {
    const tagName = event.target.tagName.toLowerCase();
    if (tagName !== 'textarea') {
      return false;
    }
  }

}
