import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Session} from './session';
import {User} from '../models/users/user';

@Injectable({
    providedIn: 'root'
})
export class StorageService {


    private localStorageService;
    private currentSession: Session = null;
    onUserChange: Array<(user: User) => void> = new Array<(user: User) => void>();

    constructor(private router: Router) {
        this.localStorageService = localStorage;
		this.currentSession = this.loadSessionData();
    }

    setCurrentSession(session: Session): void {
        this.currentSession = session;
        this.localStorageService.setItem('currentUser', JSON.stringify(session));
        if (this.onUserChange) {
            this.onUserChange.forEach((func) => func(this.getCurrentUser()));
        }
    }

    loadSessionData(): Session {
        const sessionStr = this.localStorageService.getItem('currentUser');
        return (sessionStr) ? JSON.parse(sessionStr) as Session : null;
    }

    getCurrentSession(): Session {
        return this.currentSession;
    }

    removeCurrentSession(): void {
        this.localStorageService.removeItem('currentUser');
        this.currentSession = null;
        if (this.onUserChange) {
            this.onUserChange.forEach((func) => func(this.getCurrentUser()));
        }
    }

    getCurrentUser(): User {
        const session: Session = this.getCurrentSession();
        return (session && session.user) ? session.user : null;
    }

    isAuthenticated(): boolean {
        return (this.getCurrentToken() != null) ? true : false;
    }

    getCurrentToken(): string {
        const session = this.getCurrentSession();
        return (session && session.token) ? session.token : null;
    }

    logout(): void {
        this.removeCurrentSession();
        this.router.navigate(['/login']);
    }

    getAvatarId(): string {
        const user = this.getCurrentUser();
        if (user) {
            return user.avatarId;
        }
        return null;
    }
}
