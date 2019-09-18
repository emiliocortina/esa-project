import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ApiService } from '../api.service';
import { PostObject } from './PostObject';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    createPost(postObject : PostObject) {
        return this.apiService
			.request('api/private/coop', 'post', null, postObject);
    } 
}
