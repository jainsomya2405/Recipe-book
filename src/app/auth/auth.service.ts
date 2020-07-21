import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import { catchError, tap } from "rxjs/operators";
// import { throwError, BehaviorSubject } from "rxjs";
// import { User } from "./auth.model";
import { Router } from "@angular/router";
// import { environment } from "../../environments/environment";
import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";
import * as AuthActions from "./store/auth.actions";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private expirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  setLogoutTimer(expirationDuration: number) {
    this.expirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
      this.expirationTimer = null;
    }
  }

  // signUp(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
  //         environment.firebaseAPIKey,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((resData) => {
  //         console.log(resData);

  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

  // login(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
  //         environment.firebaseAPIKey,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((resData) => {
  //         console.log(resData);
  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

  // logOut() {
  //   // this.user.next(null);
  //   this.store.dispatch(new AuthActions.Logout());
  //   // this.router.navigate(["/auth"]);
  //   localStorage.removeItem("userData");
  //   if (this.expirationTimer) {
  //     clearTimeout(this.expirationTimer);
  //   }
  //   this.expirationTimer = null;
  // }

  // autoLogout(expirationDuration: number) {
  //   this.expirationTimer = setTimeout(() => {
  //     this.logOut();
  //   }, expirationDuration);
  // }

  // autoLogin() {
  //   const userData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExpirationDate: string;
  //   } = JSON.parse(localStorage.getItem("userData"));

  //   if (!userData) {
  //     return;
  //   }

  //   const loadedUser = new User(
  //     userData.email,
  //     userData.id,
  //     userData._token,
  //     new Date(userData._tokenExpirationDate)
  //   );

  //   if (loadedUser.token) {
  //     // this.user.next(loadedUser);
  //     this.store.dispatch(
  //       new AuthActions.AuthenticateSuccess({
  //         email: userData.email,
  //         userId: userData.id,
  //         token: userData._token,
  //         expirationDate: new Date(userData._tokenExpirationDate),
  //       })
  //     );
  //     const expirationDuration =
  //       new Date(userData._tokenExpirationDate).getTime() -
  //       new Date().getTime();
  //     this.autoLogout(expirationDuration);
  //   }
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage = "An unkonwn error occured!!";
  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(errorMessage);
  //   }
  //   switch (errorRes.error.error.message) {
  //     case "EMAIL_NOT_FOUND":
  //       errorMessage = "This email is not exists";
  //       break;
  //     case "EMAIL_EXISTS":
  //       errorMessage = "This email is already exists";
  //       break;
  //     case "INVALID_PASSWORD":
  //       errorMessage = "This password is not exists";
  //       break;
  //   }
  //   return throwError(errorMessage);
  // }

  // private handleAuthentication(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const expiresDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, userId, token, expiresDate);
  //   // this.user.next(user);
  //   this.store.dispatch(
  //     new AuthActions.AuthenticateSuccess({
  //       email: email,
  //       userId: userId,
  //       token: token,
  //       expirationDate: expiresDate,
  //     })
  //   );
  //   this.autoLogout(expiresIn * 1000);
  //   localStorage.setItem("userData", JSON.stringify(user));
  // }
}
