import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegisterPayload } from 'src/app/class/register-payload';
import { AuthService } from 'src/app/services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup; 
  registerPayload: RegisterPayload
  duplicatedUser: boolean = false; 

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

    this.registerPayload = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }; 
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.registerPayload.username = this.registerForm.get('username').value; 
    this.registerPayload.email = this.registerForm.get('email').value; 
    this.registerPayload.password = this.registerForm.get('password').value; 
    this.registerPayload.confirmPassword = this.registerForm.get('confirmPassword').value; 

    this.authService.register(this.registerPayload).subscribe(data => {
      console.log("register succeed");  
      this.router.navigateByUrl("/register-success");  
    }, err => {
      console.log(err);
      this.duplicatedUser = true; 
      this.registerForm.reset();
    }
    )
  }

}
