import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { User } from '../modelService/user.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../modelService/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loginForm: FormGroup;
  returnUrl: string;

  constructor(private userService: UserService, private router: Router,
    private snackbar: MatSnackBar, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    if (localStorage.getItem == null) {
      this.router.navigate(['/Login']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get error() {
    return this.loginForm.controls;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.checkLogin(this.loginForm.value).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('emailId', response.emailId);
          localStorage.setItem('firstName', response.firstName);
          localStorage.setItem('lastName', response.lastName);

          this.router.navigate([this.returnUrl]);
          this.snackbar.open("Login successfull...", "X", { duration: 7000 });
        }
        else if (response.statusCode == 401) {
          this.snackbar.open("Please Check your Email Id for Verification...", "X", { duration: 7000 });
        }
        else if (response.statusCode == 402) {
          this.snackbar.open("User Not Found...", "X", { duration: 7000 });
        }
        else if (response.statusCode == 403) {
          this.snackbar.open("Username or Password Wrong...", "X", { duration: 7000 });
        }
      }

    );
  }

}
