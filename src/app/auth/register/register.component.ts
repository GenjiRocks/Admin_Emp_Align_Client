import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 name:string = ''
 email:string = ''
 password:string = ''

 constructor(private authservice : AuthService, private router:Router){}

  register(){
    this.authservice.register({name:this.name, email:this.email, password:this.password}).subscribe({
      next : (res)=>{
        alert("registered successfully")
        this.router.navigate(["/login"])
    },
    error: err => alert(err.error.message)
  })
}

}
