import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../modelService/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-profile-pic',
  templateUrl: './upload-profile-pic.component.html',
  styleUrls: ['./upload-profile-pic.component.css']
})
export class UploadProfilePicComponent implements OnInit 
{

  profile: [];

  constructor(private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA)public data: any,private userService:UserService, private snackbar:MatSnackBar) { }

  ngOnInit() 
  {
    this.userService.displayUserProfile(localStorage.getItem('token')).
      subscribe(profile1 =>
        {
          this.profile = profile1;
        });
  }

  displayProfile()
  {
    this.userService.displayUserProfile(localStorage.getItem('token')).
      subscribe(profile1 =>
        {
          this.profile = profile1;
        });
  }

  upload(files:File)
  {
    console.log(files);

    const formData = new FormData;
    formData.append('files',files);

    console.log(formData);

    this.userService.basicUploadSingle(formData,localStorage.getItem('token'))
    .subscribe((response: any) => {
      if (response.statusCode == 200) { 
        this.snackbar.open("Image Uploaded successfully...", "X", { duration: 7000 });
        this.displayProfile();
      }
    });
  }

  removePic()
  {
    this.userService.removeProfilePic(localStorage.getItem('token'))
    .subscribe((response: any)=>{
      if(response.statusCode == 200)
      {
        this.snackbar.open("Image Removed successfully...", "X", { duration: 7000 });
        this.displayProfile();
      }
    });
  }

}
