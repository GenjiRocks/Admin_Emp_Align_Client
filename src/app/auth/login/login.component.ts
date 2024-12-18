import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = 'rishi@gmail.com';
  // name!: string;
  password: string = '1234';

  constructor(private authService:AuthService, private router:Router){}

  login(){
    this.authService.login({email: this.email, password: this.password}).subscribe({
      next:(res:any)=>{
        sessionStorage.setItem('token', res.token);
        console.log(res);
        

        //get the role from the token
        const role = this.authService.getRole();
        console.log(`User Role =>`,role);

        if(role === 'Admin'){
          this.router.navigate(['/admin']);
          console.log('testing');
          
        }else{
          this.router.navigate(['/profile']);
        }
    },
      error:(err)=>{
        console.log(`Login Error`, err);
      }
    })
  }

}
