import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent implements OnInit {

  @Input('successMessage') successMessage:string; 
  
  constructor() { }

  ngOnInit(): void {
  }

}
