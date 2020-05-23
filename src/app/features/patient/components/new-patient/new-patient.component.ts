import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { validateWhitespace } from '@app/utilities/validators';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app-store.module';
import { Locality } from '@app/models/locality';
import { Observable, from, throwError } from 'rxjs';
import { getLocalityList } from '@app/store/selectors/list.selectors';
import { Patient, PtNewDTO } from '@app/models/patient';
import { PatientService } from '@app/services/patient.service';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {

  ptForm: FormGroup;

  localities: Locality[];
  localities$: Observable<Locality[]>;

  NHSNoValidator = /^(\d{3}) ?(\d{3}) ?(\d{4})$/g;
  DobValidator = /^(\d{2})\/(\d{2})\/(\d{4})/g;
  errors: any;



  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.reactiveForm();
    this.localities$ = this.store.select(getLocalityList);
    this.localities$.subscribe(l => this.localities = l);
  }



  reactiveForm() {
    this.ptForm = this.fb.group({
      firstName: ['', [Validators.required, validateWhitespace]],
      lastName: ['', [Validators.required, validateWhitespace]],
      dob: ['', [Validators.required]],
      nhsNo: ['', [Validators.required, Validators.pattern(this.NHSNoValidator)]],
      cpmsNo: [''],
      localityId: ['', [Validators.required]],
      notes: ['']
    });
  }

  save(newPt: PtNewDTO) {
    newPt.isOpen = true;
    const res = this.patientService.saveNewPt(newPt).subscribe(
      result => {
        // Handle result
      //  console.log(result);
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
        this.snackBar.open('Patient successfully saved to Database', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.router.navigateByUrl('/patients', {state: { data: newPt.nhsNo }});
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/patients');
   }
}
