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
  url:string;
  constructor(private router: Router,private user:UsersService) { }

  ngOnInit() {
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

