import { Component, Input, OnInit } from '@angular/core';
import { React } from '../../../../shared/memes/meme.model'
@Component({
  selector: 'app-reacts',
  templateUrl: './reacts.component.html',
  styleUrls: ['./reacts.component.css']
})
export class ReactsComponent implements OnInit {

  @Input('reacts') reacts: React[];
  constructor() { }

  ngOnInit(): void {
  }

}
