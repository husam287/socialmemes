import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/shared/posts/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  //##### File Stuff #####
fileName:string='Photo';
selectedImage:File;

//##### message from server ######
successMessage:string;
failMessage=null;

  constructor(private postService:PostsService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    const content=form.value.content; //content of the post
    
    //#### Adjust form data #####
    const formData=new FormData();
    formData.append('content',content);
    formData.append('image',this.selectedImage);

    // ##### sending The Post #####
    this.postService.addPost(formData).toPromise()
    .then(result=>{
      this.failMessage=null;
      this.successMessage=result.message;
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
