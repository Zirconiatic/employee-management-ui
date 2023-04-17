import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/user/service/authentication.service';
import { UserService } from 'src/app/user/service/user.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showPopup : boolean = false;
  popupContent? : string;
  isSuccess? : boolean;

  user! : User;
  today = new Date();
  areFieldsEditable : boolean = false;
  isUserAdmin : boolean = false;
  userList : User[] = [];

  constructor(private authenticationService: AuthenticationService,
              private route: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.authenticationService.getSessionStorageItem()!);
    
    this.isUserAdmin = this.user.admin;

    this.userService.getAllUsers().subscribe({
      next: (val) => { 
        console.log(val);
        this.userList = val;
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log("Request Completed.")
      }     
    })
  }

  onLogout(){
    this.authenticationService.removeSessionStorageItem();
    this.route.navigate(["/login"]);
  }

  onEdit(){
    this.areFieldsEditable = !this.areFieldsEditable;
  }

  onSubmit(form : NgForm){
    console.log(form);
    console.log(this.user);
    this.userService.updateUser(this.user).subscribe({
      next: (val) => { 
        console.log("Successfully Updated!")
        this.isSuccess = true;
        this.popupContent = "Successfully Updated!";
        this.showPopup = true;
        console.log(val);
        this.authenticationService.setSessionStorageItem(this.user);
      },
      error: (err) => {
        console.log("Inside Error");
        this.isSuccess = false;
        this.popupContent = "Error Updating. Please try again.";
        this.showPopup = true;
      },
      complete: () => {
        console.log("Request Completed.")
      }     
    });
    this.onEdit();
  }

  onChecked(){
    console.log("Checked")
  }

  update(){
    console.log(this.userList);
    this.userService.updateAllUsers(this.userList).subscribe({
      next: (val) => { 
        console.log("Successfully Updated!")
        this.isSuccess = true;
        this.popupContent = "Successfully Updated!";
        this.showPopup = true;
        console.log(val);
      },
      error: (err) => {
        console.log("Inside Error");
        this.isSuccess = false;
        this.popupContent = "Error Updating. Please try again.";
        this.showPopup = true;
      },
      complete: () => {
        console.log("Request Completed.")
      }     
    })
  }
  
}
