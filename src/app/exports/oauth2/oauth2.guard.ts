import {Injectable} from '@angular/core';
import {
    Router,
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {OAuth2Service} from './oauth2.service';

@Injectable()
export class OAuth2Guard implements CanActivate, CanActivateChild {

    constructor(private router: Router,
                private service: OAuth2Service) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isAuthorized = this.service.isAuthorized();
        if (isAuthorized && state.url === '/') {
            this.navigate(this.service.config.homeUri);
        }
        if (!isAuthorized && this.isPublicPage(state)) {
            this.navigate(this.service.config.backUri);
        }
        return isAuthorized;
    }

    public canActivateChild(route: ActivatedRouteSnapshot,
                            state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(route, state);
    }

    /**
     * Check, if current page is protected fallback page
     *
     * @private
     *
     * @param {RouterStateSnapshot} state
     *
     * @returns {boolean}
     */
    private isPublicPage(state: RouterStateSnapshot): boolean {
        return state.url === this.service.config.backUri ? false : true;
    }

    /**
     * Navigate away from the app / path
     *
     * @private
     * @param {string} url
     */
    private navigate(url: string): void {
        if (url.startsWith('http')) {
            window.location.href = url;
        } else {
            this.router.navigateByUrl(url);
        }
    }

}
