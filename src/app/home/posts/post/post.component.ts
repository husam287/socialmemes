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
  @Input('indexOfPost') indexOfPost:number; //index of the post

  commentsIsShow=false; //if comments are shown or not
  comments=[1,2]; //post comments
  constructor() { }

  ngOnInit(): void {
  }

  //##### Show-hide comment function #####
  showComments(){
    this.commentsIsShow=!this.commentsIsShow
    if(this.commentsIsShow){
      //set time to wait untill comment appears to select it successfully
      //select the element by nth child to not select all classes when repeated by ngfor
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
