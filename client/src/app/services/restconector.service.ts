import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { StorageService } from './authentication/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RESTConectorService {

  constructor(private http: HttpClient, private storageServ: StorageService) { }


  public toPublicUrl(method: string, url: string, body: any) {

    const options = this.getOptions();
    this.direct(method, url, body, options);


  }
  private getOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };
    return httpOptions;
  }
  private getOptionsWithToken() {
    const httpOptions = this.getOptions();
    httpOptions.headers.append('token', this.storageServ.getCurrentToken());
    if (this.storageServ.getCurrentToken() == null) {
      throw new Error('El usuario no tiene token, actuar en cosecuencia');
    }
    // Aqui se comprobaria que el usuario siga en sesion, que el token sea valido, etc etc
  }

  public toPrivateUrl(method: string, url: string, body: any) {

    const options = this.getOptionsWithToken();
    this.direct(method, url, body, options);

  }



  private direct(method: string, url: string, body: any, options: any) {
    options.body = body;

    switch (method) {
      case 'post':
        this.http.post(url, options);
        break;
      case 'get':
        this.http.get(url, options);
        break;
      case 'delete':
        this.http.delete(url, options);
        break;
      case 'patch':
        this.http.patch(url, options);
        break;
      case 'put':
        this.http.put(url, options);
        break;

      default:
        throw new Error('Method not supported');
        break;
    }

  }


}
