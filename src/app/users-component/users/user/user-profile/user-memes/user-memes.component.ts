import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Meme } from 'src/app/shared/memes/meme.model';
import { MemesService } from 'src/app/shared/memes/memes.service';

@Component({
  selector: 'app-user-memes',
  templateUrl: './user-memes.component.html',
  styleUrls: ['./user-memes.component.css']
})
export class UserMemesComponent implements OnInit {

  userMemes : Meme[];
  errorMessage=null;
  constructor(private memesService:MemesService,private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRouter.parent.params.subscribe((params:Params)=>{
    
      // ##### Getting memes of this user #####
      this.memesService.getUserMemes(params['userId']).toPromise()
      .then(memes=>{
        this.userMemes=memes;
      })
      .then(err=>{
        this.errorMessage=err;
      })
    })
  }

}
