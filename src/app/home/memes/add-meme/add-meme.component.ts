import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemesService } from 'src/app/shared/memes/memes.service';

@Component({
  selector: 'app-add-meme',
  templateUrl: './add-meme.component.html',
  styleUrls: ['./add-meme.component.css']
})
export class AddMemeComponent implements OnInit {
  @ViewChild('imageRef') imageRef:ElementRef
  isLoading=false;

  failMessage=null;
  successMessage=null;

  fileName:string;
  selectedImage:File;
 
  


  constructor(private memesService:MemesService,private route : Router,private activaRouter:ActivatedRoute) { }

  ngOnInit(): void {
  }

  

  onSubmit(){
    this.isLoading=true;
    
    //#### Adjust form data #####
    const formData=new FormData();
    formData.append('image',this.selectedImage);

    // ##### sending The Post #####
    this.memesService.addMeme(formData).toPromise()
    .then(result=>{
      this.isLoading=false;

      //clearing system messages
      this.failMessage=null;
      this.successMessage=null;
      //close the modal
      document.getElementById('buttonToExit').click();

      // Redirect to meme
      this.route.navigate([result.meme._id],{relativeTo:this.activaRouter})
    })
    .catch(err=>{
      this.isLoading=false;
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
  
    //##### Display Photo #####
    const displayedImage=this.imageRef.nativeElement;
    const fileReader = new FileReader();
    fileReader.onload=(e=>{
      displayedImage.setAttribute('src',<string>e.target.result)
    });
    fileReader.readAsDataURL(files[0]);


  }

}
