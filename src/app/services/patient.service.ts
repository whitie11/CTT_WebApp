import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Patient, PtEditDTO, PtNewDTO } from '@app/models/patient';
import { catchError, tap } from 'rxjs/operators';
import { ClinicListDTO } from '@app/models/clinicListDTO';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private api: string = environment.api_server + '/patients/';

  constructor(private http: HttpClient) { }

  private handleError(operation: string, url: string) {
    return (err: any) => {
      const errMsg = `error in ${operation}() retrieving ${url}`;
      console.log(`${errMsg}:`, err);
      if (err instanceof HttpErrorResponse) {
        // you could extract more info about the error if you want, e.g.:
        console.log(`status: ${err.status}, ${err.statusText}`);
        // errMsg = ...
      }
      return Observable.throw(errMsg);
    };
  }


  public getById(id: number): Observable<Patient> {
    const url = this.api + 'getById/' + id;
    const result = this.http.get<Patient>(url);
    return result;
  }

  public getAllPts(): Observable<Patient[]> {
    const url = this.api + 'getAll';
    const result = this.http.get<Patient[]>(url);
    return result;
  }

  public getClinicList(localityId: number): Observable<ClinicListDTO[]> {
    const url = this.api + 'getClinicList/' + localityId;
    const result = this.http.get<ClinicListDTO[]>(url);
    return result;
  }

  public saveNewPt(newPt: PtNewDTO): Observable<Patient> {
    const url = this.api + 'saveNewPt';
    return this.http.post<Patient>(url, newPt)
      .pipe(
        tap(data => console.log('server data:', data)),
        catchError((err) => {
          console.log('Error from server ', err);
          throw err;
        }
      ));

  }

  public Update(data: PtEditDTO): Observable<PtEditDTO> {
    const url = this.api + 'updatePt';
    return this.http.put<PtEditDTO>(url, data)
      .pipe(
        tap(res => console.log('server data:', res)),
        catchError((err) => {
          console.log('Error from server ', err);
          throw err;
        }
      ));

  }




}
