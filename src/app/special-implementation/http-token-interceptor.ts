import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {retry} from 'rxjs/operators';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const API_TOKEN = localStorage.getItem('access_token');
    let request;
    if ( API_TOKEN){
      request = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${API_TOKEN}` } });
    }else{
      request = httpRequest;
    }
    return next.handle(request).pipe(retry(2));
  }
}
