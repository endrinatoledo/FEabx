import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class HttpRequestsResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if ('message' in event.body) {
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
        } else if (error.status === 401) {
        } else if (error.status === 403) {
        } else if (error.status === 404) {
        } else if (error.status === 500) {
          return throwError(error);
        } else {
          return throwError(error);
        }
      }));
  }
}
