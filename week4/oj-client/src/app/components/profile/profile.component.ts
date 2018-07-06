// src/app/profile/profile.component.ts

import { Component, OnInit, Inject } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;
  email: "";
  username: "";

  constructor(@Inject('auth') public auth) { }

  ngOnInit() {
    // if (this.auth.userProfile) {
    //   this.profile = this.auth.userProfile;
    //   console.log("this.auth.userProfile exist!!");
    // } else {
    //   this.auth.getProfile((err, profile) => {
    //     this.profile = profile;
    //   });
    //   console.log("this.auth.userProfile doe not exist!!");
    // }
    let profile = this.auth.getProfile();
    console.log("profile email is " + profile);
    console.log("profile name is " + profile.nickname);
    this.email = profile.email;
    this.username = profile.nickname;
  }

  resetPassword() {
    this.auth.resetPassword();
  }

}