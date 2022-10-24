import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  public email: string;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateTo(page: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        email: this.email
      }
    };
    this.router.navigate([page], navigationExtras);
  }

}
