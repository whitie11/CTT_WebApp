import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Appt } from '@app/models/appt';
import { Clinic } from '@app/models/clinic';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DiaryState } from '../../state/diary.reducer';
import { getClinicList } from '@app/store/selectors/list.selectors';
import { ClinicListDTO } from '@app/models/clinicListDTO';
import { PatientService } from '@app/services/patient.service';
import { ApptTypes } from '@app/models/apptTyes';
import { ListService } from '@app/services/list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DiaryService } from '@app/services/DIaryService';

@Component({
  selector: 'app-appt-new',
  templateUrl: './appt-new.component.html',
  styleUrls: ['./appt-new.component.scss']
})
export class ApptNewComponent implements OnInit {

  state: any;
  activatedRoute: any;
  apptForm: FormGroup;
  selectedClinic: string;
  clinics: Clinic[];
  clinics$: Observable<Clinic[]>;
  dateStr: string;
  timeStr: string;

  clinicList$: Observable<ClinicListDTO[]>;
  clinicList: ClinicListDTO[];

  apptType$: Observable<ApptTypes[]>;
  apptType: ApptTypes[];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<DiaryState>,
    private patientService: PatientService,
    private diaryService: DiaryService,
    private listService: ListService,
    private snackBar: MatSnackBar
  ) {
    this.state = this.router.getCurrentNavigation().extras.state.appt;
    this.clinics$ = this.store.select(getClinicList);
    this.clinics$.subscribe(l => this.clinics = l);
    this.clinicList$ = this.patientService.getClinicList(this.state.clinicId);
    this.clinicList$.subscribe(c => this.clinicList = c);
    this.apptType$ = this.listService.getApptTypes();
    this.apptType$.subscribe(t => this.apptType = t);
  }

  ngOnInit(): void {

    this.reactiveForm();
    const cl = this.clinics.find(c => c.clinicId === this.state.clinicId);
    this.selectedClinic = cl.clinicName + '(' + this.state.clinicGroup + ')';
    this.dateStr = this.getDateString(this.state.date);
    this.timeStr = this.state.timeSlotText;
  }

  getDateString(date: Date) {
    const d = new Date(date);
    return d.toLocaleDateString();
  }


  reactiveForm() {
    this.apptForm = this.fb.group({
      apptId: [0],
      date: [this.changeDate(this.state.date)],
      timeSlotId: [this.state.timeSlotId],
      clinicId: [this.state.clinicId],
      notes: [''],
      patientId: ['', [Validators.required]],
      stageId: [1],
      typeId: ['', [Validators.required]],
      clinicGroup: [this.state.clinicGroup]
    });
  }

  changeDate(fromDate: Date) {
    const UTCDate = Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());

    return new Date(UTCDate);
  }

  save(newAppt: Appt) {
    // newPt.isOpen = true;
    const res = this.diaryService.saveAppt(newAppt).subscribe(
      result => {
        // Handle result
        //  console.log(result);
      },
      error => {
        // this.errors = error;
        this.snackBar.open(error, 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
        this.snackBar.open('Appointment successfully saved to Database', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.router.navigateByUrl('/diaries');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/diaries');
  }

}
