import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user-services';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent {
  users:any
  message:any
  constructor(private auth:AuthService,private data:UserService){}
  ngOnInit(){
    this.auth.getTable().subscribe(
      result=>{
        console.log(result)
        if(result!=null){
          this.users=result
        }
      }
    );
    this.message="true"
    this.data.currentMessage.subscribe(message =>this.message=message);
    this.data.changeMessage("true")


  }
  logout() {
    localStorage.removeItem("token")
    this.data.changeMessage("false")

}
}


