import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { tap, take, catchError } from 'rxjs/operators';
import { User, userData } from './user.model';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { domainName } from '../domain';
const domain = domainName ;

interface authData {
  token: string,
  userId: string,
  expireDate: number
}




@Injectable({
  providedIn: 'root'
})
export class UsersService {


  user = new BehaviorSubject<User>(null);

  logoutTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(name: string, email: string, password: string,) {

    return this.http.post(domain + 'users/signup', { name: name, email: email, password: password })

  }

  logIn(email: string, password: string) {
    return this.handelAuth(email, password);
  }



  getUserInfo(userId: string) {
    return this.http.get<userData>(domain + 'users/' + userId + '/get')

  }

  getAllUsers() {
    return this.http.get<userData[]>(domain + 'users/getAll')
  }

  
  autoLogIn() {
    const u:{
      _token:string,
      _expireDate:number,
      userId:string,
      name:string,
      image:string
    } 
    = JSON.parse(localStorage.getItem('userData'));

    if(!u){
      return;
    }
    const user=new User(u.userId,u._token,u._expireDate,u.name,u.image);

    if(!user.token){
      return;
    }

    this.user.next(user);
    this.autoLogOut(user.expireDate);
  }

  logOut() {
    localStorage.clear();
    this.user.next(null);
    clearTimeout(this.logoutTimer);
    this.router.navigate(['/'])
  }


  autoLogOut(expireDate: Date) {
    this.logoutTimer = setTimeout(() => {
      if (confirm('Please login again')) {
        this.logOut();
    }
    }, expireDate.getTime() - new Date().getTime());
    
  }



  private handelAuth(email: string, password: string) {
    return this.http.post<authData>(domain + 'users/login', { email: email, password: password })
      .pipe(catchError(this.handelErrors),
        tap(result => {
          const user = new User(result.userId, result.token, +result.expireDate);          
          this.user.next(user);
          this.http.get<User>(domain + 'users/' + user.userId + '/get').subscribe(userData => {
            user.name = userData.name;
            user.image = userData.image;
            user.bio = userData.bio;
            localStorage.setItem('userData', JSON.stringify(user));
            this.autoLogOut(user.expireDate);
            this.router.navigate(['home']);

          })
        })
      )
  }

  private handelErrors(error: HttpErrorResponse) {
    if (error.error.message || error.message) {
      return throwError(error.error.message)
    }
    else {
      return throwError('unknown error has been occured')
    }
  }

}
