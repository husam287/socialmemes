import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'socialmedia';
  url:string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events
      .subscribe(
        (event: Event) => {
          if (event instanceof NavigationStart) {
            this.url=event.url;

          }
        });
  }



}

