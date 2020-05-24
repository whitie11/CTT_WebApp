import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DiaryState } from '../../state/diary.reducer';
import { PatientService } from '@app/services/patient.service';
import { DiaryService } from '@app/services/DIaryService';
import { ListService } from '@app/services/list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appt } from '@app/models/appt';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-appt-edit',
  templateUrl: './appt-edit.component.html',
  styleUrls: ['./appt-edit.component.scss']
})
export class ApptEditComponent implements OnInit {

  currentApptId: number;
  currentAppt$: any;
  currentAppt: any;
  activatedRoute: any;
  apptForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<DiaryState>,
    private patientService: PatientService,
    private diaryService: DiaryService,
    private listService: ListService,
    private snackBar: MatSnackBar
  ) {
    this.currentApptId = this.router.getCurrentNavigation().extras.state.apptId;

  }

  ngOnInit(): void {
    this.currentAppt$ = this.diaryService.getAppt(this.currentApptId);
    this.currentAppt$.subscribe(a => {
      this.currentAppt = a;
      console.log('currentAppt ' + this.currentAppt);
     });

  }

}
