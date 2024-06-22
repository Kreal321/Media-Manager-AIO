import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {from, mergeMap, Observable, of, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import Swal from 'sweetalert2'
import {SettingService} from "../services/setting.service";
import {PikpakService} from "../services/pikpak.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private settingService: SettingService,
        private pikpakService: PikpakService
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        let re = new RegExp(this.settingService.getPikpakApiHost() + "|" + this.settingService.getPikpakUserHost(), 'g');

        if (re.test(req.url)) {
          console.log('intercepted pikpak request ... ');
          return next.handle(req.clone(
            {
              url: this.settingService.getCloudflareUrl() + "/" + req.url,
            }
          )).pipe(
              tap({
                  next: (event) => {

                  }
              }),
              catchError((error) => {
                      // if (error.status == 403) {
                      //     localStorage.removeItem('token');
                      //     Swal.fire({
                      //         title: 'You are not logged in',
                      //         text: 'Please login first',
                      //         showDenyButton: true,
                      //         icon: 'error',
                      //         confirmButtonText: 'Login',
                      //         denyButtonText: 'Continue as guest',
                      //         denyButtonColor: '#9fa6b2',
                      //     }).then((request) => {
                      //         if (request.isConfirmed) {
                      //             this.router.navigate(['/login']);
                      //         }
                      //         if (request.isDenied) {
                      //             this.router.navigate(['/register/temp']);
                      //         }
                      //     })
                      // } else if (error.status == 400) {
                      //     Swal.fire({
                      //         title: 'Bad Request',
                      //         text: error.error.message,
                      //         icon: 'error',
                      //     })
                      // } else if (error.status == 401) {
                      //     this.router.navigateByUrl('/login?success=false');
                      //     Swal.fire({
                      //         title: 'Auto Login Failed',
                      //         text: error.error.message,
                      //         icon: 'error',
                      //     })
                      // } else {
                      //     Swal.fire({
                      //         title: 'Network Error',
                      //         text: 'Please try again later',
                      //         icon: 'error',
                      //     })
                      //     console.error('An unexpected error occurred: ', error.error.message);
                      //     throwError(() => error);
                      // }
                  // return of(error.error);
                  throw error.error;
              })
          ) as Observable<HttpEvent<any>>;

        }

        console.log('Interpreter: not pikpak request');
        return next.handle(req);

    }

}
