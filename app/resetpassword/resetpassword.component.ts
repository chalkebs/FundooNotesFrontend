import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../modelService/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../modelService/user.model';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetPasswordComponent implements OnInit {
  user: User = new User();
  resetPasswordForm: FormGroup;
  hide = true;
  submitted = false;
  token: string;

  constructor(private userService: UserService, private router: Router,
    private snackbar: MatSnackBar, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.resetPasswordForm.controls;
  }

  resetPassword() {

    this.submitted = true;

    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.token = this.route.snapshot.paramMap.get("token");

    this.userService.resetPasswordMethod(this.resetPasswordForm.value, this.token).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.snackbar.open("New Password is saved successfully...", "X", { duration: 7000 });
          this.router.navigate(['/Login']);
        }
        else if (response.statusCode == 401) {
          this.snackbar.open("Email Id is not present...", "X", { duration: 7000 });
        }
      }
    );
  }
}
