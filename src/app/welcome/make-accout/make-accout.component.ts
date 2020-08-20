import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-make-accout',
  templateUrl: './make-accout.component.html',
  styleUrls: ['./make-accout.component.css']
})
export class MakeAccoutComponent implements OnInit {

  @Input() target;
  constructor() { }

  ngOnInit(): void {
  }

  goToForm(){
    this.target.scrollIntoView({block:'center',behavior:'smooth'});
  }

}
