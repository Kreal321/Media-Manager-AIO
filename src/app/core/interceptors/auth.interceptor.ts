import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import Swal from 'sweetalert2'



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

        console.log('intercepted request ... ');

        return next.handle(req.clone(
            {
                headers
            }
        )).pipe(
            tap({
                next: (event) => {

                }
            }),
            catchError((error) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status == 403) {
                        localStorage.removeItem('token');
                        Swal.fire({
                            title: 'You are not logged in',
                            text: 'Please login first',
                            showDenyButton: true,
                            icon: 'error',
                            confirmButtonText: 'Login',
                            denyButtonText: 'Continue as guest',
                            denyButtonColor: '#9fa6b2',
                        }).then((request) => {
                            if (request.isConfirmed) {
                                this.router.navigate(['/login']);
                            }
                            if (request.isDenied) {
                                this.router.navigate(['/register/temp']);
                            }
                        })
                    } else if (error.status == 400) {
                        Swal.fire({
                            title: 'Bad Request',
                            text: error.error.message,
                            icon: 'error',
                        })
                    } else if (error.status == 401) {
                        this.router.navigateByUrl('/login?success=false');
                        Swal.fire({
                            title: 'Auto Login Failed',
                            text: error.error.message,
                            icon: 'error',
                        })
                    } else {
                        Swal.fire({
                            title: 'Network Error',
                            text: 'Please try again later',
                            icon: 'error',
                        })
                        console.error('An unexpected error occurred: ', error.error.message);
                        throwError(() => error);
                    }
                }
                return of(error.error);
            })
        ) as Observable<HttpEvent<any>>;

    }

}
