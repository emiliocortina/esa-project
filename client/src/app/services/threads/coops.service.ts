import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { CoopObject } from './CoopObject';

@Injectable({
    providedIn: 'root'
})
export class CoopsService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    createCoop(coopObject: CoopObject) {
        return this.apiService
            .request('api/private/coop', 'post', null, coopObject);
    }

    createComment(coopObject: CoopObject, idParent: string) {
        return this.apiService
            .request('api/private/comment/' + idParent, 'post', null, coopObject);
    }
}
