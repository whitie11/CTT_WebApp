import { Locality } from './locality';

export interface Patient {
    patientId: number;
    firstName: string;
    lastName: string;
    dob: Date;
    nhsNo: string;
    cpmsNo: string;
    notes: string;
    isOpen: boolean;
    locality: Locality;
}

export interface PtEditDTO {
    patientId: number;
    notes: string;
    isOpen: boolean;
    localityId: number;
}

export interface PtNewDTO {
    patientId: number;
    firstName: string;
    lastName: string;
    dob: Date;
    nhsNo: string;
    cpmsNo: string;
    notes: string;
    isOpen: boolean;
    localityId: number;
}


