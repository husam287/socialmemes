import { Component, OnInit, Input } from '@angular/core';
import { domainName } from 'src/app/shared/domain';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  domain=domainName;
  @Input('postData') postData;
  @Input('indexOfPost') indexOfPost;
  commentsIsShow=false;
  comments=[1,2]; //post comments
  constructor() { }

  ngOnInit(): void {
  }

  showComments(){
    this.commentsIsShow=!this.commentsIsShow
    if(this.commentsIsShow){
      setTimeout(() => {
        document.getElementsByClassName('comments')[this.indexOfPost].scrollIntoView({block:'center',behavior:'smooth'})
      }, 20);
    }
    else{
      setTimeout(() => {
        document.getElementsByClassName('post')[this.indexOfPost].scrollIntoView({block:'center',behavior:'smooth'})
      }, 20);
    }
  }

}
