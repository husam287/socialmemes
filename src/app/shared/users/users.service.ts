import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { tap, take, catchError } from 'rxjs/operators';
import { User, userData } from './user.model';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
const domain = "http://localhost:8080";

interface authData {
  token: string,
  userId: string,
  expireDate: Date
}




@Injectable({
  providedIn: 'root'
})
export class UsersService {


  user = new BehaviorSubject<User>(null);

  logoutTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(name: string, email: string, password: string,) {

    return this.http.post(domain + '/users/signup', { name: name, email: email, password: password })

  }

  logIn(email: string, password: string) {
    return this.handelAuth(email, password);
  }



  getUserInfo(userId: string) {
    return this.http.get<userData>(domain + '/users/' + userId + '/get')

  }

  getAllUsers() {
    return this.http.get<userData[]>(domain + '/users/getAll')
  }

  
  autoLogIn() {
    const user: User = JSON.parse(localStorage.getItem('userData'));
    this.user.next(user);
    this.autoLogOut(user.expireDate);
  }

  logOut() {
    localStorage.clear();
    this.user.next(null);
    if (confirm('Please login again')) {
      this.router.navigate(['/']);
    }
  }


  autoLogOut(expireDate: Date) {
    this.logoutTimer = setTimeout(() => {
      this.logOut();
    }, new Date(expireDate).getTime() - new Date().getTime());
  }



  private handelAuth(email: string, password: string) {
    return this.http.post<authData>(domain + '/users/login', { email: email, password: password })
      .pipe(catchError(this.handelErrors),
        tap(result => {
          const user = new User(result.userId, result.token, result.expireDate);
          this.user.next(user);
          this.http.get<User>(domain + '/users/' + user.userId + '/get').subscribe(userData => {
            user.name = userData.name;
            user.image = userData.image;
            user.bio = userData.bio;
            localStorage.setItem('userData', JSON.stringify(user));
            this.autoLogOut(user.expireDate);

          })
        })
      )
  }

  private handelErrors(error: HttpErrorResponse) {
    console.log(error);
    if (error.error.message || error.message) {
      return throwError(error.error.message)
    }
    else {
      return throwError('unknown error has been occured')
    }
  }

}
