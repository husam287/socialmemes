import { Component, OnInit, Input } from '@angular/core';
import { domainName } from 'src/app/shared/domain';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input('commentData') commentData;
  domain=domainName;
  constructor() { }

  ngOnInit(): void {
  }

}
