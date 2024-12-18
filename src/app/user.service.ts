import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {}

  // get all users
  getUsers() {
    return this.http.get(this.apiUrl);
  }

  getUserById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  //update the user
  updateUser(id: number, data: any) {
    console.log(data);
    return this.http.put(`${this.apiUrl}/${id}`, data); 
  }

  //delete the user
  deleteUser(id: number) {
    console.log(`delete api`);
    
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //search user by name
/*   searchUser(name: string) {
    console.log(`${this.apiUrl}/search`,{params: {name: name}});
    
    return this.http.get(`${this.apiUrl}/search`,{params: {name: name}});
  } */

  //passing the sort parameter inside search route
  searchUser(name: string, sort:string = 'asc') {
    console.log(`${this.apiUrl}/search`, { params: { name, sort } });
    
    return this.http.get(`${this.apiUrl}/search`, { params: { name, sort } });
  }

  /* 
  //uploading file image
  uploadProfileImage(userId: number, formData: FormData) {
  return this.http.post(`${this.apiUrl}/users/${userId}/upload-profile-image`,formData);
}
  
  */
  

 
}
