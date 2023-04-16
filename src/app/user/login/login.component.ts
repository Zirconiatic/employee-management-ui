import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showPopup : boolean = false;
  popupContent? : string;
  isSuccess? : boolean;

  response? : any;

  constructor(private userService : UserService,
              private router : Router,
              private authenticationService : AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    console.log("On Submit Called")
    this.userService.authenticateUser(form.value.login_username, form.value.login_password).subscribe({
      next: (val) => { 
        console.log("Successfully Authenticated!")
        this.isSuccess = true;
        this.popupContent = "Success! Redirecting you to dashboard";
        this.showPopup = true;

        this.authenticationService.setSessionStorageItem(val);

        setTimeout(()=>{
          console.log("set timeout called")
          this.router.navigate(['/dashboard']);
        }, 5000);
      },
      error: (err) => {
        console.log("Inside Error");
        this.isSuccess = false;
        this.popupContent = "Invalid credentials. Please try again.";
        this.showPopup = true;
      },
      complete: () => {
        console.log("Request Completed.")
      }     
    });
  }
}
