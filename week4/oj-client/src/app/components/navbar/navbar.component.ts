import { Component, OnInit, inject, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = "COJ";
  username = "";

  searchBox: FormControl = new FormControl();
  subscription: Subscription;

  constructor(@Inject('auth') private auth,
              @Inject('input') private input,
              private router : Router) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.username = this.auth.getProfile().nickname;
    }

    this.subscription = this.searchBox
                            .valueChanges
                            .pipe(debounceTime(200))
                            .subscribe(
                              term => {
                                this.input.changeInput(term);
                              }
                            );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchProblem(): void {
    this.router.navigate(['/problems']);
  }

  login(): void {
    this.auth.login()
              .then(profile => this.username = profile.nickname)
              .catch(error => console.log(error));
  }

  logout(): void {
    this.auth.logout();
  }
}