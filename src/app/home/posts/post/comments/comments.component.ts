import { Component, OnInit, Input } from '@angular/core';
import { domainName } from 'src/app/shared/domain';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  domain=domainName;
  @Input('comments') comments;
  constructor() { }

  ngOnInit(): void {
  }

}
