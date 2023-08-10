import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpParams,
    HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, exhaustMap, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user/user.service';
//   import { ErrorService } from './core/error/error.service';

const { apiUrl } = environment;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log(req.url);
      
      // Check if the request method is POST and the URL matches the desired one
      if (
        (req.method === 'POST' && req.url === `${apiUrl}/recipes`)||
        (req.method==="PUT" && req.url.startsWith(`${apiUrl}/recipes/`))||
        (req.method==="DELETE" && req.url.startsWith(`${apiUrl}/recipes`))||
        (req.method==="POST" && req.url.startsWith(`${apiUrl}/categories`))
        ){
        const user = this.userService.user$$?.getValue();
        if (user && user.accessToken) {
         
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
          });
          const modifiedReq = req.clone({ headers: headers });
          return next.handle(modifiedReq);
        }
      }
  
      // For other requests or if the conditions are not met, pass the original request
      return next.handle(req);
    }
}

    // intercept(
    //     req: HttpRequest<any>,
    //     next: HttpHandler
    // ) {
    //     return this.userService.user$$.pipe(take(1), exhaustMap(user => {

        
    //         const headers = new HttpHeaders({
    //           'Content-Type': 'application/json',
    //           'X-Authorization': user!.accessToken
    //         });
    //             const modifiedRequest = req.clone({

    //             }) //{headers: req.headers.append('x-authorization','aaa')}

    //         })
    //     )
    //     console.log(req.url);
        
    //     return next.handle(modifiedRequest);
    // }

    // return this.userService.user$.pipe(
    //     take(1),
    //     exhaustMap((user) => {
    //         if(!user) {
    //             return next.handle(req);
    //         }
    //         const extendedReq = req.clone({
    //             params: new HttpParams().set('auth', user.accessToken)
    //         })
    //       return next.handle(extendedReq);
    //     })
    //   );
    // }
    // if (req.url.startsWith('/data')) {
    //     req = req.clone({
    //         url: req.url.replace('/data', apiUrl),
    //         withCredentials: true, // Cookie -> JWT
    //     });
    // } else if (req.url.startsWith('/users')) {
    //     console.log('hello from intercepror');
    //     req = req.clone({
    //         url: req.url.replace('/users', "http://localhost:3000/users"),
    //         withCredentials: true, // Cookie -> JWT
    //     });
    // }

    // return next.handle(req).pipe(
    //     catchError((err) => {
    //         if (err.status === 401) {
    //             this.router.navigate(['/login']);
    //         } else {
    //             //this.errorServie.setError(err);
    //             // this.router.navigate(['/error'])
    //             console.log(err);
    //             ;
    //         }

    //         return [err];
    //     })
    // );
    // }


// export const appInterceptorProvider: Provider = {
//     multi: true,
//     useClass: AppInterceptor,
//     provide: HTTP_INTERCEPTORS,
// };