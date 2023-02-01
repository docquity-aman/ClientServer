import { Component, Injectable } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-services';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
@Injectable()
export class HeaderComponent {
  
  message:any=false;
  constructor(private data:UserService, private authservice:AuthService,private router:Router){
  }

  isloggedin:any
  ngOnInit(){
    this.data.currentMessage.subscribe(message =>this.message=message)

    this.isloggedin=this.authservice.isLoggedin();
    console.log(this.isloggedin)
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['/auth/login'])
  }
}
