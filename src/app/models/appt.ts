import { Time } from '@angular/common';
import { TimeSlot } from './diaryListItem';

export interface Appt{
    apptId: number;
    date: Date;
    timeSlot: string;
    timeSlotId: number;
    clinicId: number;
    notes: string;
    patientId: number;
    stageId: number;
    typeId: number;
    clinicGroup: string;
    }

