import { Injectable } from '@angular/core';
import { User } from '@app/models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  // public getUsers(){

  //   const users: User[] = [
  //     {
  //       id: null,
  //       token: '',
  //       username: 'Dummy Data',
  //       firstName: 'Not defined',
  //       lastName: 'Not defined',
  //       role: ''
  //   },
  //   {
  //     id: null,
  //     token: '',
  //     username: 'still defined',
  //     firstName: 'still defined',
  //     lastName: 'still defined',
  //     role: ''
  // }
  // ];
  //   return users;
  // }

  // public getUser(id: any){

  //   const user: User =
  //     {
  //       id: null,
  //       token: '',
  //       username: 'Dummy Data!!',
  //       firstName: 'Not defined',
  //       lastName: 'Not defined',
  //       role: ''
  //   }
  //   ;
  //   return user;
  // }
}
