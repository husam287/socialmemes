import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { userData } from 'src/app/shared/users/user.model';
import { UsersService } from 'src/app/shared/users/users.service';
import { Meme } from '../../../shared/memes/meme.model';
import { MemesService } from '../../../shared/memes/memes.service';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent implements OnInit, OnDestroy {

  @ViewChild('modalCloseButton') modalCloseButton: ElementRef; //reference to close button in the modal

  errorMessage: string; // Error Message

  //meme and user Data
  @Input('memeData') memeData: Meme;

  //React Vars
  like: boolean = false;
  haha: boolean = false;
  angry: boolean = false;

  constructor(private userAuth:UsersService,private activeRoute: ActivatedRoute, private memesService: MemesService) { }

  ngOnInit(): void {

    //###### Initiallizing when is in view mode ######
    this.activeRoute.params.subscribe((params: Params) => {
      if (params['memeId']) {
        this.memesService.getMeme(params['memeId']).toPromise()
          .then(meme => {
            this.initializeMeme(meme);
          })
          .catch(err => {
            this.errorMessage = err;
          });

      }
      else {this.initializeMeme(this.memeData);}
    })
  }


  onLike() {
    this.like = !this.like;

    if (this.like) {
      this.haha=false;
      this.angry=false;

      this.memesService.reactLike(this.memeData._id).toPromise()
      .then(result => {
        console.log(result.message);
        this.initializeMeme(result.meme);

      })
      .catch(err=>{
        alert(err.message);
      })
    }
    else{
      this.removeReact();
    }
  }

  onHaha() {
    this.haha = !this.haha;
    if (this.haha) {
      this.like=false;
      this.angry=false;
    
      this.memesService.reactHaha(this.memeData._id).toPromise()
      .then(result => {
        console.log(result.message);
        this.initializeMeme(result.meme);

      })
      .catch(err=>{
        alert(err.message);
      })
    }
    else{
      this.removeReact();
    }
  }

  onAngry() {
    this.angry = !this.angry;
    if (this.angry) {
      this.like=false;
      this.haha=false;
      
      this.memesService.reactAngry(this.memeData._id).toPromise()
      .then(result => {
        console.log(result.message);
        this.initializeMeme(result.meme);

      })
      .catch(err=>{
        alert(err.message);
      })
    }
    else{
      this.removeReact();
    }
  }


  //##### To remove react ######
  private removeReact(){
    this.memesService.removeReact(this.memeData._id).toPromise()
      .then(result=>{
        console.log(result.message);
        this.initializeMeme(result.meme);
      })
      .catch(err=>{
        alert(err.message);
      })
  }

  ngOnDestroy() {
    this.modalCloseButton.nativeElement.click();
  }





  private initializeMeme(meme:Meme) {

    this.memeData=meme;

    this.memeData = new Meme(this.memeData._id,
      this.memeData.creator,
      this.memeData.image,
      this.memeData.reacts,
      this.memeData.createdAt);


    //Adjust like button state

    this.userAuth.user.subscribe(user => {
      const likes = this.memeData.reacts.map(i => {
        return i._id;
      })

      const index = likes.indexOf(user.userId); //index of user react

      if (index >= 0) {
        if (this.memeData.reacts[index].reactType === 'like') {
          this.like = true;
        }
        if (this.memeData.reacts[index].reactType === 'haha') {
          this.haha = true;
        }
        if (this.memeData.reacts[index].reactType === 'angry') {
          this.angry = true;
        }
      }
    });

  }
}
