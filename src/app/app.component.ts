import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { UsersService } from './shared/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'socialmedia';
  url:string; //url of current page
  constructor(private router: Router,private user:UsersService) { }

  ngOnInit() {

    //##### Checking url for remove nav bar when we are on welcome page #####
    this.router.events
      .subscribe(
        (event: Event) => {
          if (event instanceof NavigationStart) {
            this.url=event.url;

          }
        });

        this.user.autoLogIn();
    
        
  }



}

