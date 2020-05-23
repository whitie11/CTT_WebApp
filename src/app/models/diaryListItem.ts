

export interface DiaryListItem{
timeSlot: string;
patientName: string;
reason: string;
apptId: number;
patientId: number;
stageId: number;
timeSlotId: number;
notes: string;
}

export interface TimeSlot{

    timeSlotId: number;
    slot: string;
}

export interface DiaryRow{
    timeSlot: TimeSlot;
    setA: DiaryListItem;
    setB: DiaryListItem;
    setC: DiaryListItem;
}

export interface DiaryReqDTO {
    date: string;
    clinicId: number;
}
