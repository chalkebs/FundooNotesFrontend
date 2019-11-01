import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../modelService/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(private userService: UserService, private snackbar: MatSnackBar,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]]
    });
  }

  get error() {
    return this.forgotPasswordForm.controls;
  }

  forgotPassword() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.userService.sendLink(this.forgotPasswordForm.value).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.snackbar.open("Password Reset Link is Sent to your Email Id...", "X", { duration: 7000 });
          this.router.navigate(['/Login']);
        }
        else if (response.statusCode == 401) {
          this.snackbar.open("User Not Found", "X", { duration: 7000 });
        }
      }
    );
  }

}
