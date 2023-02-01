import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl='http://localhost:3000/auth'
  apiRegister='http://localhost:3000/users'

  constructor(private http:HttpClient) { }

  proceedLogin(userCredential:any){
    const apilogin=this.apiUrl+"/login"
    return this.http.post(apilogin,userCredential)

  }

  proceedRegister(userCredential:any){
    return this.http.post(this.apiRegister,userCredential)
  }

getTable(){
    const apitable='http://localhost:3000/profile'
    console.log(this.http.get(apitable))
    return this.http.get(apitable)
  }

isLoggedin(){
  return !!localStorage.getItem("token")
}

}
