import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Component, OnInit} from '@angular/core';
import { Validators, FormGroup, FormBuilder} from '@angular/forms';
import { User } from '../modelService/user.model';
import { UserService } from '../modelService/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit
{
  user : User = new User();
  myForm : FormGroup;

  constructor(private userService: UserService, private snackbar : MatSnackBar, 
    private router : Router, private formBuilder: FormBuilder) 
  { }

  ngOnInit()
  {
    this.myForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      emailId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      mobileNum: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]]
    });
  }

  get error() 
  { 
    return this.myForm.controls;
  }

  onSubmit()
  {
    this.userService.createUser(this.myForm.value).subscribe(
    (response : any) => 
    {
      if(response.statusCode==200)
      {
        this.snackbar.open("user Registered successfully...Please check your email for verification and then try for Login...","X",{ duration:7000 });
        this.router.navigate(['/Login']);
      }
      else if(response.statusCode==401)
      {
        this.snackbar.open("User already registered","X",{ duration:7000 });
      }
      else
      {
        this.snackbar.open("Registration Failed...","X",{ duration:7000 });
      }
    }
    );     
  }

}
