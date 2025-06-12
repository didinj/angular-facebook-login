import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    SocialAuthService,
    SocialLoginModule,
    SocialUser,
    FacebookLoginProvider,
} from '@abacritt/angularx-social-login';

@Component({
    selector: 'app-facebook-login',
    standalone: true,
    imports: [CommonModule, SocialLoginModule],
    template: `
    <div class="container">
      <h1>Facebook Login with Angular 20</h1>
      <button *ngIf="!loggedIn" (click)="signInWithFB()">Login with Facebook</button>

      <div *ngIf="loggedIn">
        <img [src]="user?.photoUrl" alt="Avatar" width="60" height="60" />
        <h3>{{ user?.name }}</h3>
        <p>{{ user?.email }}</p>
        <button (click)="signOut()">Logout</button>
      </div>
    </div>
  `,
})
export class FacebookLoginComponent implements OnInit {
    private authService = inject(SocialAuthService);

    user?: SocialUser;
    loggedIn = false;

    ngOnInit(): void {
        this.authService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = !!user;
        });
    }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
        this.authService.signOut();
    }
}
