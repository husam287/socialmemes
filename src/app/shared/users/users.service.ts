import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { tap, take, catchError } from 'rxjs/operators';
import { User, userData } from './user.model';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { domainName } from '../domain';

const domain = domainName;

interface authData {
  token: string,
  userId: string,
  expireDate: number
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {


  user = new BehaviorSubject<User>(null); //auth iinfo
  currentUserData = new BehaviorSubject<userData>(null); //auth iinfo

  logoutTimer: any; //timer

  constructor(private http: HttpClient, private router: Router) { }


  //########## sign up ##########


  signUp(name: string, email: string, password: string,) {

    return this.http.post(domain + 'users/signup', { name: name, email: email, password: password })

  }


  //########## login ##########


  logIn(email: string, password: string) {
    return this.handelAuth(email, password);
  }


  //########## to get a user by id ##########


  editUserInfo(formData:FormData,userId:string){
   return this.http.put(`${domain}users/${userId}/edit`,formData);
  }

  
  //########## to get a user by id ##########


  getUserInfo(userId: string) {
    return this.http.get<userData>(domain + 'users/' + userId + '/get')

  }


  //########## to get array of all users ##########


  getAllUsers() {
    return this.http.get<userData[]>(domain + 'users/getAll')
  }


  //########## automatic login ##########


  autoLogIn() {
    const u: {
      _token: string,
      _expireDate: number,
      userId: string,
    }
      = JSON.parse(localStorage.getItem('userData')); //must get the data like to adjust the user class

    if (!u) return; //if there is no data in the local storage

    const user = new User(u.userId, u._token, u._expireDate);

    if (!user.token){
      this.logOut();
      return; //if token expires
    } 

    this.user.next(user);
    
    this.getUserInfo(user.userId).subscribe(
      user=>{
        this.currentUserData.next(user);
      });
  
    this.autoLogOut(user.expireDate);
  }


  //########## manual log out ##########


  logOut() {
    localStorage.clear();
    this.user.next(null);
    clearTimeout(this.logoutTimer); //clear the time if you log out
    this.router.navigate(['/'])
  }

  
  //########## auto log out function ##########


  autoLogOut(expireDate: Date) {
    this.logoutTimer = setTimeout(() => {
      if (confirm('Please login again')) {
        this.logOut();
      }
    }, expireDate.getTime() - new Date().getTime()); //time to logout automatically

  }


  //########## login function ##########
  
  
  private handelAuth(email: string, password: string) {
    return this.http.post<authData>(domain + 'users/login', { email: email, password: password })
      .pipe(catchError(this.handelErrors),
        tap(result => {
          const user = new User(result.userId, result.token, +result.expireDate);
          this.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
          this.autoLogOut(user.expireDate); //set the autolog out to logout after expire time
          this.router.navigate(['home']);

          this.getUserInfo(user.userId).subscribe(
            user=>{
              this.currentUserData.next(user);
            }
          )
        })

      )
  }


  //########## Error handel function ########## 


  private handelErrors(error: HttpErrorResponse) {
    if (error.error.message || error.statusText) {
      return throwError(error)
    }
    return throwError('unknown error has been occured')
  }

}
