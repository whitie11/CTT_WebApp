import { Component, OnInit, ViewChild } from '@angular/core';
import { Clinic } from '@app/models/clinic';
import { Appt } from '@app/models/appt';
import { ListService } from '@app/services/list.service';
import { Observable } from 'rxjs';
import { DiaryRow, DiaryReqDTO, DiaryListItem, TimeSlot } from '@app/models/diaryListItem';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { DiaryState } from '../../state/diary.reducer';
import { Store } from '@ngrx/store';
import { getDiaryPage, isLoading, getDiaryControls } from '../../state';
import { LoadDiary, SaveDiaryControls } from '../../state/diary.actions';
import { getClinicList } from '@app/store/selectors/list.selectors';
import { LoadClinicList } from '@app/store/actions/list.actions';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DiaryControls } from '@app/models/diaryControls';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  constructor(
    private listService: ListService,
    private store: Store<DiaryState>,
    private fb: FormBuilder,
    private router: Router
  ) {
    // this.store.dispatch(new LoadClinicList());
    this.clinics$ = this.store.select(getClinicList);
    this.clinics$.subscribe(l => this.clinics = l);
  }

  @ViewChild(MatTable, { static: true }) table: MatTable<DiaryRow>;

  clinics: Clinic[];
  clinics$: Observable<Clinic[]>;

  diaryPage: DiaryRow[];
  diaryPage$: Observable<DiaryRow[]>;

  dataSource = new MatTableDataSource(this.diaryPage);

  date: Date;
  date$: Observable<Date>;
  selectedClinic: Clinic = {
    clinicId: 0,
    clinicName: ''
  };

  selectedClinicId = 0;

  setB = true;
  setC = true;

  displayedColumns = [
    'Time',
    'Name1',
    'Reason1',
    'Name2',
    'Reason2',
    'Name3',
    'Reason3'
  ];

  displayedHeaders = [
    'header-row-time-group',
    'header-row-first-group',
    'header-row-second-group',
    'header-row-third-group'
  ];

  diaryReq: DiaryReqDTO = {
    date: '',
    clinicId: null
  };

  loading$: Observable<boolean>;
  loading: boolean;


  diaryControls: DiaryControls;

  ngOnInit(): void {
    this.loading$ = this.store.select(isLoading);
    this.loading$.subscribe(l => this.loading = l);

    const diaryControl$ = this.store.select(getDiaryControls);
    diaryControl$.subscribe(dc => {
      if (dc != null) {
        this.selectedClinicId = dc.clinic.clinicId;
        this.date = dc.date;
        this.setB = dc.setB;
        this.setC = dc.setC;

        this.loadDiary();
      }
    });
    this.showCols();
  }

  saveDiaryControls() {
    if (this.date && this.selectedClinicId > 0) {
      const clinic = this.clinics.find(c => c.clinicId === this.selectedClinicId);
      this.diaryControls = {
        clinic,
        date: this.date,
        setB: this.setB,
        setC: this.setC
      };
      this.store.dispatch(new SaveDiaryControls(this.diaryControls));
    }
  }

  controlChange() {
    this.saveDiaryControls();
    this.loadDiary();
  }


  public loadDiary() {
    if (this.date && this.selectedClinicId) {
      this.diaryReq = {
        date: this.convertDate(this.date),
        clinicId: this.selectedClinicId
      };
      this.store.dispatch(new LoadDiary(this.diaryReq));
      this.diaryPage$ = this.store.select(getDiaryPage);
      this.diaryPage$.subscribe(p => {
        this.diaryPage = p;
        this.table.dataSource = new MatTableDataSource(p);
      });
    }
  }

  convertDate(date: Date) {
    const day = date.getDate();       // yields date
    const month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
    const year = date.getFullYear();  // yields year
    const hour = date.getHours();     // yields hours
    const minute = date.getMinutes(); // yields minutes
    const second = date.getSeconds(); // yields seconds
    // After this construct a string with the above results as below
    const time = year + '-' + month + '-' + day + ' ' + 0 + ':' + 0 + ':' + 0;
    return time;
  }

  showCols() {
    this.displayedColumns = ['Time', 'Name1', 'Reason1'];
    this.displayedHeaders = [
      'header-row-time-group',
      'header-row-first-group'];
    if (this.setB) {
      this.displayedColumns.push('Name2', 'Reason2');
      this.displayedHeaders.push('header-row-second-group');
    }
    if (this.setC) {
      this.displayedColumns.push('Name3', 'Reason3');
      this.displayedHeaders.push('header-row-third-group');
    }
    this.saveDiaryControls();
  }

  setStyleA(item: DiaryRow) {
    if (item.setA === null) {
      return { 'background-color': '#efe5fd' };
    }


    let bgColour = '#efe5fd';

    switch (item.setA.stageId) {
      case 2: {
        bgColour = '#9df76f';
        break;
      }
      case 3: {
        bgColour = '#f7ea72';
        break;
      }
      default: {
        bgColour = '#efe5fd';
        break;
      }
    }

    if (item.setA != null && item.setA.notes != null && item.setA.notes.length > 0) {
      return { 'background-color': bgColour, color: '#ff0000' };
    } else {
      return { 'background-color': bgColour };
    }
  }

  showToolTipA(item: DiaryRow) {
    if (item.setA === null || item.setA.notes === null || item.setA.notes.length < 1) {
      return 'true';
    } else { return 'false'; }
  }

  setStyleB(item: DiaryRow) {
    if (item.setB === null) {
      return { 'background-color': '#e3f2fd' };
    }

    let bgColour = '#e3f2fd';

    switch (item.setB.stageId) {
      case 2: {
        bgColour = '#9df76f';
        break;
      }
      case 3: {
        bgColour = '#f7ea72';
        break;
      }
      default: {
        bgColour = '#e3f2fd';
        break;
      }
    }

    if (item.setB != null && item.setB.notes != null && item.setB.notes.length > 0) {
      return { 'background-color': bgColour, color: '#ff0000' };
    } else {
      return { 'background-color': bgColour };
    }
  }

  showToolTipB(item: DiaryRow) {
    if (item.setB === null || item.setB.notes === null || item.setB.notes.length < 1) {
      return 'true';
    } else { return 'false'; }
  }

  setStyleC(item: DiaryRow) {
    if (item.setC === null) {
      return { 'background-color': '#ffebee' };
    }

    let bgColour = '#ffebee';

    switch (item.setC.stageId) {
      case 2: {
        bgColour = '#9df76f';
        break;
      }
      case 3: {
        bgColour = '#f7ea72';
        break;
      }
      default: {
        bgColour = '#ffebee';
        break;
      }
    }

    if (item.setC != null && item.setC.notes != null && item.setC.notes.length > 0) {
      return { 'background-color': bgColour, color: '#ff0000' };
    } else {
      return { 'background-color': bgColour };
    }
  }

  showToolTipC(item: DiaryRow) {
    if (item.setC === null || item.setC.notes === null || item.setC.notes.length < 1) {
      return 'true';
    } else { return 'false'; }
  }

  showEdit(item: DiaryListItem, group: string, ts: TimeSlot) {
    this.saveDiaryControls();
    if (item.patientId !== 0) {
      this.router.navigateByUrl('/diaries/appt_edit', { state: { apptId: item.apptId } });
    }
    else {
      const newAppt: Appt = {
        apptId: 0,
        date: this.date,
        timeSlot: ts.slot,
        timeSlotId: ts.timeSlotId,
        clinicId: this.selectedClinicId,
        notes: '',
        patientId: 0,
        stageId: 0,
        typeId: 0,
        clinicGroup: group
      };

      this.router.navigateByUrl('/diaries/appt_new', { state: { appt: newAppt } });
    }

  }

}
