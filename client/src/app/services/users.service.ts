import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  getUser(): User {
    return null;
  }
}
