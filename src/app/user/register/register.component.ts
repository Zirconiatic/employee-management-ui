import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showPopup : boolean = false;
  popupContent? : string;
  isSuccess? : boolean;

  @ViewChild('f') registrationForm: NgForm | undefined;

  constructor(private userService : UserService,
              private router : Router) { }

  ngOnInit(): void {
  }

  // onSubmit(form : NgForm){
  //   console.log(form)
  // }

  // Alternative method
  onSubmit(){
    
    const user = new User();
    user.addr1 = this.registrationForm?.value.login_addr1;
    user.addr2 = this.registrationForm?.value.login_addr2;
    user.addr3 = this.registrationForm?.value.login_addr3;
    user.dateOfBirth = this.registrationForm?.value.login_dob;
    user.firstName = this.registrationForm?.value.login_fname;
    user.lastName = this.registrationForm?.value.login_lname;
    user.password = this.registrationForm?.value.login_password;
    user.phoneNumber = this.registrationForm?.value.login_phoneno;
    user.postalCode = this.registrationForm?.value.login_postalcode;
    user.username = this.registrationForm?.value.login_username;

    console.log(user)

    // Saving the user by passing the data and getting the value
    this.userService.saveUser(user).subscribe({
      next: (val) => {
                        console.log("Inside Next"); 
                        this.isSuccess = true;
                        this.popupContent = "Success!, you will be redirected to login page.";
                        this.showPopup = true;
                        
                        setTimeout(()=>{
                          console.log("set timeout called")
                          this.router.navigate(['/login']);
                        }, 2000);
                      },
      error: (err) => {
                        console.log("Inside Error");
                        this.isSuccess = false;
                        this.popupContent = "Error registering the details. Please reach out to support.";
                        this.showPopup = true;
                      },
      complete: () => {
                        console.log("Request Completed.")
                      }     
    });

  }

}
