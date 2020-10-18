import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { userData } from 'src/app/shared/users/user.model';
import { UsersService } from 'src/app/shared/users/users.service';
import { Meme, React } from '../../../shared/memes/meme.model';
import { MemesService } from '../../../shared/memes/memes.service';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent implements OnInit, OnDestroy {

  @ViewChild('modalCloseButton') modalCloseButton: ElementRef; //reference to close button in the photo modal

  @ViewChild('LikeReactListClose') LikeReactListClose: ElementRef;
  @ViewChild('HahaReactListClose') HahaReactListClose: ElementRef;
  @ViewChild('AngryReactListClose') AngryReactListClose: ElementRef;




  errorMessage: string; // Error Message

  //meme and user Data
  @Input('memeData') memeData: Meme;

  //React objects
  likeReact: { "clicked": boolean, list: React[] } = { clicked: false, list: [] }
  hahaReact: { "clicked": boolean, list: React[] } = { clicked: false, list: [] }
  angryReact: { "clicked": boolean, list: React[] } = { clicked: false, list: [] }

  constructor(private userAuth: UsersService, private activeRoute: ActivatedRoute, private memesService: MemesService) { }

  ngOnInit(): void {

    //###### Initiallizing when is in view mode ######
    this.activeRoute.params.subscribe((params: Params) => {
      if (params['memeId']) {
        this.memesService.getMeme(params['memeId']).toPromise()
          .then(meme => {
            this.initializeMeme(meme);
            this.initializeReact(meme.reacts);
          })
          .catch(err => {
            this.errorMessage = err;
          });
      }
      // ##### In memes page #####
      else {
        this.initializeMeme(this.memeData);
        this.initializeReact(this.memeData.reacts);
      }
    })
  }


  onLike() {
    this.likeReact.clicked = !this.likeReact.clicked;

    if (this.likeReact.clicked) {
      this.hahaReact.clicked = false;
      this.angryReact.clicked = false;

      this.memesService.reactLike(this.memeData._id).toPromise()
        .then(result => {
          console.log(result.message);
          this.initializeMeme(result.meme);
          this.initializeReact(result.meme.reacts);

        })
        .catch(err => {
          alert(err.message);
          this.likeReact.clicked = !this.likeReact.clicked;

        })
    }
    else {
      this.removeReact();
    }
  }

  onHaha() {
    this.hahaReact.clicked = !this.hahaReact.clicked;
    if (this.hahaReact.clicked) {
      this.likeReact.clicked = false;
      this.angryReact.clicked = false;

      //##### Audio Effect #####
      let audio = new Audio('assets/haha.mp3');
      audio.play();

      this.memesService.reactHaha(this.memeData._id).toPromise()
        .then(result => {
          console.log(result.message);
          this.initializeMeme(result.meme);
          this.initializeReact(result.meme.reacts);

        })
        .catch(err => {
          alert(err.message);
          this.hahaReact.clicked = !this.hahaReact.clicked;

        })
    }
    else {
      this.removeReact();
    }
  }

  onAngry() {
    this.angryReact.clicked = !this.angryReact.clicked;
    if (this.angryReact.clicked) {
      this.likeReact.clicked = false;
      this.hahaReact.clicked = false;

      this.memesService.reactAngry(this.memeData._id).toPromise()
        .then(result => {
          console.log(result.message);
          this.initializeMeme(result.meme);
          this.initializeReact(result.meme.reacts);

        })
        .catch(err => {
          this.angryReact.clicked = !this.angryReact.clicked;
          alert(err.message);
        })
    }
    else {
      this.removeReact();
    }
  }

  ngOnDestroy() {
    this.modalCloseButton.nativeElement.click();
    this.LikeReactListClose.nativeElement.click();
    this.HahaReactListClose.nativeElement.click();
    this.AngryReactListClose.nativeElement.click();

  }

  //##### To remove react ######
  private removeReact() {
    this.memesService.removeReact(this.memeData._id).toPromise()
      .then(result => {
        console.log(result.message);
        this.initializeMeme(result.meme);
        this.initializeReact(result.meme.reacts);
      })
      .catch(err => {
        alert(err.message);
      })
  }




  // ##### Counting reacts #####
  private initializeReact(reacts: React[]) {

    // Getting
    const result = this.memesService.getReactsDetails(reacts)
    //Assigning
    this.likeReact.list = result.likeList;
    this.hahaReact.list = result.hahaList;
    this.angryReact.list = result.angryList;
  }


  //##### pUtting meme in an object with a constractor #####
  private initializeMeme(meme: Meme) {

    this.memeData = meme;

    this.memeData = new Meme(this.memeData._id,
      this.memeData.creator,
      this.memeData.image,
      this.memeData.reacts,
      this.memeData.createdAt);


    //Adjust like button state

    this.userAuth.user.subscribe(user => {
      const likes = this.memeData.reacts.map(i => {
        return i.reactOwner._id;
      })

      const index = likes.indexOf(user.userId); //index of user react

      if (index >= 0) {
        if (this.memeData.reacts[index].reactType === 'like') {
          this.likeReact.clicked = true;
        }
        if (this.memeData.reacts[index].reactType === 'haha') {
          this.hahaReact.clicked = true;
        }
        if (this.memeData.reacts[index].reactType === 'angry') {
          this.angryReact.clicked = true;
        }
      }
    });

  }
}
