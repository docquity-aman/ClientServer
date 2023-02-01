import { AnimateTimings } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-services';
import { AuthService } from 'src/app/service/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { patterns } from '../pattern.constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  message: any;
  registerForm!: FormGroup
  submitted = false
  validation = false
  responsedata: any

  constructor(private data: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toast: NgToastService) { }


  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: [''],
      email: ['', [Validators.required, Validators.email, Validators.pattern(patterns.email_regex)]],
      password: ['', [Validators.required, Validators.pattern(patterns.pass_regex)]],
      confirm_password: ['', [Validators.required,]],
      mobile: ['', [Validators.required, Validators.pattern(patterns.phone_regex)]]

    },
      {
        validators: this.mustMatch('password', 'confirm_password')
      });

    this.data.changeMessage("false");


  }

  get form(): { [key: string]: AbstractControl; } {
    return this.registerForm.controls;
  }

  async registerSubmitted() {
    console.log(this.registerForm)
    console.log(this.message)
    this.submitted = true

    if (this.registerForm.invalid) {
      return
    }

    this.validation = true
    this.authService.proceedRegister(this.registerForm.value).subscribe(result => {
      console.log(this.registerForm.controls)
      if (result != null) {
        console.log(result)
        this.responsedata = result
        if (this.responsedata.code) {
          this.showSuccess()
          setTimeout(() =>{
            this.router.navigate(['/auth/login'])
          },2000);
        }
        else{
          this.showError()
        }

      }

    }, (error) => {
      this.showErr(error)
    })

  }

//confirm validation
  mustMatch(password: any, confirm_password: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirm_passwordControl = formGroup.controls[confirm_password];

      if (confirm_passwordControl.errors && !confirm_passwordControl.errors['mustMatch']) {
        return;

      }
      if (passwordControl.value !== confirm_passwordControl.value) {
        confirm_passwordControl.setErrors({ mustMatch: true });
      } else {
        confirm_passwordControl.setErrors(null);
      }

    }

  }
  //TOAST

  showError() {
    this.toast.error({ detail: "ERROR", summary: 'User Already Exist.', sticky: true });
  }
  showErr(error: any) {
    this.toast.error({ detail: "ERROR", summary: `${error}`, sticky: true });
  }
  showSuccess() {
    this.toast.success({ detail: "SUCCESS", summary: 'Registration Successfull!Please Login..', duration: 4000 });
  }



  changeComp() {
    this.router.navigate(['/register']);
  }
}
