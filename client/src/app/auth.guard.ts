import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {UsersService} from './services/users.service';


@Injectable()
export class NeedAuthGuard implements CanActivate {

    constructor(private customerService: UsersService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const redirectUrl = route['_routerState']['url'];

        if (this.customerService.isLogged()) {
            return true;
        }

        this.router.navigateByUrl(
            this.router.createUrlTree(
                ['/tabs/profile/login'], {
                    queryParams: {
                        redirectUrl
                    }
                }
            )
        );

        return false;
    }
}
