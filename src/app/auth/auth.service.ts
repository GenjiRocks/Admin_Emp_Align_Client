import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth'

  constructor(private http : HttpClient) { }

  // login the user
  login(data : any){
    return this.http.post(`${this.apiUrl}/login`, data)
  }

  //getting role of logged in User from the token

  getRole(): string | null {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.role;
    }
    return null;
  }

  // register the user
  register(data : any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, data)
  }

  //Check logged In
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  //logging out user
  logout(): void {
    sessionStorage.removeItem('token');
  }
  
  
}
