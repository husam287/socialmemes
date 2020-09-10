import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/shared/posts/posts.service';
import { Post } from 'src/app/shared/posts/post.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  //##### File Stuff #####
fileName:string='Photo';
selectedImage:File;

@Input('editMode') editMode=false;
@Input('defulatData') defaultData:Post; //defualt value while editing the post

//##### message from server ######
successMessage:string;
failMessage=null;



  constructor(private postService:PostsService,private router:Router) { }

  ngOnInit(): void {



    //if in edit mode change default file name
    if(this.editMode){
      this.fileName='Click if you want to change photo';
    }
  }

  onSubmit(form:NgForm){
    const content=form.value.content; //content of the post
    
    //#### Adjust form data #####
    const formData=new FormData();
    formData.append('content',content);
    formData.append('image',this.selectedImage);

    // ##### Editing the post ##### 
    if(this.editMode){
      this.postService.editPost(this.defaultData._id,formData).toPromise()
      .then((result)=>{
        this.postService.post.next(result.updatedPost);
        confirm(result.message);
        this.router.navigate(['home','posts',this.defaultData._id])
      })
      .catch(err=>{
        this.failMessage=err;
      })
      return;
    }


    // ##### sending The Post #####
    this.postService.addPost(formData).toPromise()
    .then(result=>{
      this.failMessage=null;
      this.successMessage=result.message;
      //close the modal
      document.getElementById('buttonToExit').click();
    })
    .catch(err=>{
      this.successMessage=null;
      this.failMessage=err;
    })
  }

  onChange(files:FileList){

    const type=files[0].type.split('/')[1]; //type of image


    //##### Rejections #####
    if(files.length>1){
      alert('Please Select one image only');
      return 
    }

    if(!(type==='png' || type==='jpg' || type==='jpeg' || type==='gif')){
      alert('Please Select a proper image [Jpg, Png, Jpeg, or Gif]');
      return 
    }

    //##### named after select #####
    const fileName=files[0].name;
    this.fileName=fileName;

    //##### Select The Photo #####
    this.selectedImage=files[0];

  }
}
