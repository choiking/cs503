import { Component, OnInit, inject, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = "COJ";

  username = "";

  constructor(@Inject('auth') private auth: AuthService) { }

  ngOnInit() {
    console.log("navbar init!");
    this.auth.nicknameChange$.subscribe(username => this.username = username);  
    console.log("user name is " + this.username); 
  }


  login(): void {
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
  }



}
