import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PostsService } from 'src/app/shared/posts/posts.service';
import { take, delay } from 'rxjs/operators';
import { Meme } from 'src/app/shared/memes/meme.model';
import { MemesService } from 'src/app/shared/memes/memes.service';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.css']
})
export class MemesComponent implements OnInit,OnDestroy {
  @ViewChild('closeButton') closeButton:ElementRef;

  errorMessage:string;
  memes:Meme[];

  constructor(private memesService:MemesService) { }

  ngOnInit(): void {
    // ##### initialize memes array ######
    this.memesService.getMemes().toPromise()
    .then(memes=>{
      this.memes=memes;
    })
    .catch(err=>{
      this.errorMessage=err;
    })
  }

  ngOnDestroy(){
    this.closeButton.nativeElement.click();
  }


  
}
