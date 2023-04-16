import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/user/service/authentication.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user! : User;
  today = new Date();

  constructor(private authenticationService: AuthenticationService,
              private route: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.authenticationService.getSessionStorageItem()!);
    console.log(this.user)
  }

  onClick(){
    this.authenticationService.removeSessionStorageItem();
    this.route.navigate(["/login"]);
  }

}
