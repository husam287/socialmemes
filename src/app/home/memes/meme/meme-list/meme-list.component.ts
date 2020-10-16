import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemesService } from 'src/app/shared/memes/memes.service';

@Component({
  selector: 'app-meme-list',
  templateUrl: './meme-list.component.html',
  styleUrls: ['./meme-list.component.css']
})
export class MemeListComponent implements OnInit {

  @Input('memeId') memeId:string;
  constructor(private router:Router,private memesService:MemesService) { }

  ngOnInit(): void {
  }


  onView(){
    this.router.navigate(['home','memes',this.memeId]);
  }


  onDelete(){
    //##### confirm message #####
    if(!confirm('Are you shure to delete this post permanently ?!')){
      return;
    }


    this.memesService.deleteMeme(this.memeId).toPromise()
    .then(()=>{
      this.router.navigate(['home','memes']);
    })
    .catch(err=>{
      const errorMessage=err.error.message? err.error.message:err.statusText;
      alert(errorMessage);
    })
  }


}
