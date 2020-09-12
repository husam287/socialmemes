import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { userData } from 'src/app/shared/users/user.model';
import { UsersService } from 'src/app/shared/users/users.service';
import { domainName } from 'src/app/shared/domain';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  //##### vars in edit mode only #####
  showNameInput=false;
  showBioInput=false;
  selectedImage:File;
  successMessage=null;
  errorMessage=null;

  userData: userData;
  domain = domainName;

  sub1: Subscription;

  editMode = false;
  constructor(private activeRouter: ActivatedRoute, private auth: UsersService) { }

  ngOnInit(): void {
    //##### Subscribe to query params #####
    this.sub1 = this.activeRouter.queryParams.subscribe((result: Params) => {

      //gettin userId from params
      let userId;
      userId = this.activeRouter.snapshot.params['userId'];
      
      //Getting the user data of user id
      this.auth.getUserInfo(userId).toPromise()
        .then(userDoc => {
          this.userData = userDoc;
        })
        .catch(err=>{
          this.errorMessage=err;
        })

      //if not edit mode
      if (!result['edit']) {
        this.editMode = false;
      }
      else {
        this.editMode = true;
      }
    })

  }

  //##### submit changes #####
  onEditUser(editForm:NgForm){
    this.errorMessage=null;
    this.successMessage=null;

    // assigning data
    const formData= new FormData();
    if(editForm.value.name){
      formData.append('name',editForm.value.name);
    }
    if(editForm.value.bio){
      formData.append('bio',editForm.value.bio);
    }
    if(this.selectedImage){
      formData.append('image',this.selectedImage);
    }

    //sending data to edit user
    this.auth.editUserInfo(formData,this.userData._id).toPromise()
    .then(result=>{
      this.successMessage = result.message;

      //updating user data in user profile
      this.userData=result.user;

      //updating user data observable
      this.auth.currentUserData.next(result.user);

      this.onCancel();
    })
    .catch(err=>{
      this.errorMessage=err;
    })

  }


  onCancel(){
    this.showNameInput=false;
    this.showBioInput=false;
    
    //cancel preview image and clear selected image
    this.selectedImage=null;
    document.getElementById('profilePic').setAttribute('src',`${this.domain}${this.userData.image}`);
  }

  onSelectImage(files:FileList){
    this.selectedImage=files[0];
    
    //##### preview selected image in profile image of the user ######
    let reader=new FileReader();
    reader.onload=(e)=>{
      document.getElementById('profilePic').setAttribute('src',e.target.result.toString());
    }
    reader.readAsDataURL(this.selectedImage);


  }


  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
