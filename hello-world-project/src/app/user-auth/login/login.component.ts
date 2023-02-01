import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/service/user-services';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { patterns } from '../pattern.constant';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: any;
  loginForm!: FormGroup
  submitted = false
  userExist: any = true
  responsedata: any;

  constructor(private data: UserService,
    private formBuilder: FormBuilder, private router: Router,
    private authService: AuthService) {

  }
  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message),

      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email, Validators.pattern(patterns.email_regex)]],
        password: ['', Validators.required]


      });
    this.data.changeMessage("false")

  }

  get form(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }



  loginSubmit() {

    console.log(this.loginForm)
    this.submitted = true

    if (this.loginForm.invalid) {
      return
    }

    this.authService.proceedLogin(this.loginForm.value).subscribe(result => {
      console.log(this.loginForm.controls)
      if (result != null) {
        console.log(result)
        this.responsedata = result
        localStorage.setItem('token', this.responsedata.access_token)
        this.router.navigate(['comp'])
        localStorage.setItem('token', this.responsedata.access_token)
      }
    }, (error) => {
      this.userExist = false
    })
  }


}



