import { Component, ViewChild } from '@angular/core';
import { UserService } from './service/user-services';
import { LoginComponent } from './user-auth/login/login.component';
import { RegisterComponent } from './user-auth/register/register.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent {

  title = 'hello-world-project';

  ngOnInit() { 

  }

  
}
