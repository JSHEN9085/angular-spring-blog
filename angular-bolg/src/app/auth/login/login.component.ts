import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginPayload } from 'src/app/class/login-payload'; 
import { AuthService } from 'src/app/services/auth.service'; 
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup; 
  loginPayload: LoginPayload;
  loginFailed: boolean = false; 

  constructor(private authService : AuthService, 
              private router: Router,
              private localStorageService: LocalStorageService) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });

    this.loginPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.loginPayload.username = this.loginForm.get('username').value;
    this.loginPayload.password = this.loginForm.get('password').value;
    this.authService.login(this.loginPayload).subscribe(data => {
      if(data) {      
        console.log('login success');
        this.router.navigateByUrl('/home');
      } else {
        console.log("login failed"); 
      }
    })
    if(this.localStorageService.retrieve('username') == null){
      this.loginFailed = true;
    }
  }
  //**  to see the data, need to subscribe **// 

}
