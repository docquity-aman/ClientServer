import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyComponentComponent } from './my-component/my-component.component';
import { HeaderComponent } from './my-component/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './my-component/footer/footer.component';
import { BodyPhotoComponent } from './my-component/body-photo/body-photo.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { LoginComponent } from './user-auth/login/login.component';
import { RegisterComponent } from './user-auth/register/register.component';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpService } from './service/app-http.service';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user-services';
import { TokenInterceptor } from './helper/token.interceptor';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    AppComponent,
    MyComponentComponent,
    HeaderComponent,
    FooterComponent,
    BodyPhotoComponent,
    UserAuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [AuthService,UserService,{
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
