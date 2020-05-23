import { Injectable } from '@angular/core';
import { HttpClient , HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthDTO } from '@app/models/auth';
import { RegisterDTO } from '@app/models/registerDTO';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
test: any;
  private api: string = environment.api_server + '/auth/';

  constructor(private http: HttpClient) { }

  public  login(user: AuthDTO) {
    const url = this.api + 'authenticate' ;
    const result = this.http.post<any>(url, user);
    return  result;
 }

 public  getAllUsers() {
  const url = this.api + 'getAll' ;
  const result = this.http.get(url);
  return  result;
}

public  getUser(id: number) {
  const url = this.api + id ;
  const result = this.http.get(url);
  return  result;
}

  public register(user: RegisterDTO) {
    const url = this.api + 'register' ;
    return this.http.post<any>(url, user);
    }

    public update(id: number, user: RegisterDTO) {
      const url = this.api + id ;
      return this.http.put<any>(url, user);
      }

  get token(){
   return  localStorage.getItem('user_token');
  }

  set token(val: string){
    if (val){
      localStorage.setItem('user_token', val );
    }else {
      localStorage.clear();
    }
  }
}
