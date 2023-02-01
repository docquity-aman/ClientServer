import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "../service/auth.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()  
export class TokenInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if(err) throw new Error("Method not implemented.");

        const idToken = localStorage.getItem("token");
        console.log("headers",req.headers);

        if (idToken) {
            // console.log(req.headers);

            const cloned = req.clone({
                // headers: req.headers.set("Authorization :",`Bearer ${idToken}`)
                setHeaders: {
                    Authorization: `Bearer ${idToken}`
                  }
            });
            console.log("header inside",req.headers);

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }

    
}
  