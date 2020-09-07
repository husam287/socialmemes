import { Component, OnInit, Input } from '@angular/core';
import { domainName } from 'src/app/shared/domain';
import { Comment } from 'src/app/shared/comments/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input('commentData') commentData:Comment;
  domain=domainName;
  constructor() { }

  ngOnInit(): void {
  }

}
