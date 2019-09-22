import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { CoopObject } from './CoopObject';
import { Post } from '../models/threads/post.model';
import { User } from '../models/users/user';
import { SatelliteData } from '../models/satellite-data/satellite-data.model';
import { SatelliteService } from '../satellite/satellite.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class CoopsService {

    constructor(
        private http: HttpClient,
        private apiService: ApiService,
        private satelliteService: SatelliteService,
        private sanitizer: DomSanitizer) {
    }


    public async loadCoop(coopId: string, user: User, threadCategory: string, callback) {
        this.apiService.request('api/coop/' + coopId, 'get', null, null).subscribe((coop: any) => {
            this.loadCoopFromObject(coop, user, threadCategory, callback);
        });
    }

    public async loadCoopFromObject(coopObj, user: User, threadCategory: string, callback) {
        var dataArray: SatelliteData[] = [];
        this.loadCoopData(0, coopObj.data, dataArray, threadCategory, () => {

            let post = new Post(coopObj._id, coopObj.text, user, new Date(coopObj.timestamp), dataArray);
            this.loadCoopComments(0, coopObj.children, [], post, () => {
                callback(post);
            });
        });
    }


    private loadCoopData(count: number, ids: string[], dataArray: SatelliteData[], threadCategory: string, callback) {
        if (ids == undefined) {
            callback();
            return;
        }
        if (count >= ids.length) {
            callback();
            return;
        }
        this.satelliteService.loadSatelliteData(ids[count], threadCategory, data => {
            dataArray.push(data);
            this.loadCoopData(count + 1, ids, dataArray, threadCategory, callback);
        });
    }




    private loadCoopComments(count: number, ids: string[], commentArray: Post[], parent: Post, callback) {
        if (ids == undefined) {
            callback();
            return;
        }
        if (count >= ids.length) {
            parent.addComments(commentArray);
            callback();
            return;
        }

        this.apiService.request('api/coop/' + ids[count], 'get', null, null)
            .subscribe((comment: any) => {
                this.apiService.request('auth/user/' + comment.author, 'get', null, null)
                    .subscribe((childUser: any) => {
                        const user = new User(childUser.nickName, childUser.name, childUser.email);
                        var res = new Post(comment._id, comment.text, user, new Date(comment.timestamp), []);
                        commentArray.push(res);
                        this.loadCoopComments(count + 1, ids, commentArray, parent, callback);
                    });
            });
    }




    createCoop(coopObject: CoopObject) {
        console.log("CREATING COOP");
        console.log(coopObject);
        return this.apiService.request(
            'api/private/coop',
            'post',
            null,
            coopObject
        );
    }

    createComment(coopObject: CoopObject, idParent: string) {
        return this.apiService.request(
            'api/private/comment/' + idParent,
            'post',
            null,
            coopObject
        );
    }

}
