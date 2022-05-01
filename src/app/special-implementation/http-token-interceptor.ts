import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {retry, tap} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const API_TOKEN = localStorage.getItem('access_token');
    let request;
    if ( API_TOKEN){
      request = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${API_TOKEN}` } });
    }else{
      request = httpRequest;
    }
    return next.handle(request).pipe(
      //retry(2)
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log(`HttpResponse for ${event.url}`);
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigate(['/logout']);
          }
        }
      })
    );
  }
}
