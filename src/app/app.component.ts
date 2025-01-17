import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  constructor(public authservice: AuthService, private router:Router){}

  logout(){
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
}
