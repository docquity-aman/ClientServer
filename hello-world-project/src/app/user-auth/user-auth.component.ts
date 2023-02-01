import { Component ,ModuleWithComponentFactories,OnInit} from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserService } from '../service/user-services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{
  message:any="login"; 
  msg:string="login";
 constructor(private data:UserService,private router:Router){}
  ngOnInit(): void {
     this.data.currentMessage.subscribe(message =>this.message=message)
  }
  // comp: any = RegisterComponent;
//  message:any='login';
  // detectComp(message: any){
  //   if(message=='login'){
  //     // this.comp=LoginComponent;
  //     console.log
  //     this.router.navigate(['/login']);
  //     this.data.changeMessage("register");
  //     this.msg="register"
      
  //   }
  //   else{
  //     // this.comp=RegisterComponent;
  //     this.router.navigate(['/register']);
  //     this.data.changeMessage("login");
  //     this.msg="login";
  //     this.router.navigate([this.msg]);

  //   }
  // }

}
