import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';


interface UserResponseData {
  accessToken: string;
  email: string;
  username: string;
  _id: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$$ = new BehaviorSubject<User | undefined>(undefined);
  token: string | undefined;
  // public user$ = this.user$$.asObservable();

  // user: User | undefined;
  // USER_KEY = '[userInfo]'


  // get isLogged(): boolean {
  //   return !!this.user;
  // }

  constructor(private http: HttpClient) {
    // try {
    //   const localStorageUser = localStorage.getItem(this.USER_KEY) || "";
    //   this.user = JSON.parse(localStorageUser)
    // } catch (error) {
    //   this.user = undefined
    // }
  }

  login(
    email: string,
    password: string
  ) {

    return this.http.post<UserResponseData>('http://localhost:3000/users/login', {
      // username:,
      email: email,
      password: password
    }).pipe(catchError(errorRes => {
      let errorMessage = 'An unknown error occurred!';
      if (!errorRes) {
        return throwError(errorMessage);
      }//??
      errorMessage = errorRes.error.message
      return throwError(errorMessage);
    }), tap(resData => {
      this.handleAuthenticaton(
        resData._id,
        resData.username,
        resData.email,
        resData.accessToken
      )
    }))
    // .pipe(tap((resData) => {
    //   this.handleAuth(
    //     resData.email,
    //     resData.gender,
    //     resData.id,
    //     resData.username,
    //     resData.accessToken
    //   );
    // }));
  }

  register(
    username: string,
    email: string,
    password: string,
  ) {
    return this.http.post<UserResponseData>('http://localhost:3000/users/register', {
      username: username,
      email: email,
      password: password
    }).pipe(catchError
      (errorRes => {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes) {
          return throwError(errorMessage);
        }//??
        errorMessage = errorRes.error.message
        return throwError(errorMessage);
      }), tap(resData => {
        this.handleAuthenticaton(
          resData._id,
          resData.username,
          resData.email,
          resData.accessToken
        )
      }))
  }

  private handleAuthenticaton(
    _id: string,
    username: string,
    email: string,
    accessToken: string
  ) {
    const user = new User(
      _id,
      username,
      email,
      accessToken
    );
    this.user$$.next(user)

    // .pipe(tap((resData) => {
    //   this.handleAuth(
    //     resData.email,
    //     resData.gender,
    //     resData.id,
    //     resData.username,
    //     resData.accessToken
    //   );
    // }));
  }

  // logout(): void {
  //   this.user = undefined;
  //   localStorage.removeItem(this.USER_KEY)
  // }

  // private handleAuth(
  //   id: string,
  //   username: string,
  //   email: string,
  //   gender: string,
  //   accessToken: string

  // ) {
  //   const user = new User(id, username, email, gender, accessToken);
  //   this.user$$.next(user);
  //   // this.autoLogout(expiresIn * 1000);
  //   localStorage.setItem('userInfo', JSON.stringify(user));
  // }
}


