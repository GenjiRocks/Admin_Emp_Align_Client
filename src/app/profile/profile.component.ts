import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user = { id: 0,name: '', email: '', age: '', department: '', image:''}; // User object with placeholders
  defaultUser = { email: '', age: '', department: '', image:''}; // Default values for comparison

  selectedFile: File | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    // console.log(token);

    if (token) {
      const decodedToken: any = jwtDecode(token);
      // console.log("Token Role: ", decodedToken.role);

      this.user.id = Number(decodedToken.id);

      // console.log(this.user.id);
      this.loadData()
      
    }
  }

  loadData(){
    try {
        
      this.userService.getUserById(this.user.id).subscribe((data:any) => {
       console.log(data);
       
       this.user.name = data.name;
       this.user.email = data.email;
       this.user.age = data.age;
       this.user.department = data.department;
       this.user.image = data.image;

       this.defaultUser = {...this.user}; 
       // console.log(this.defaultUser);
       // Copy user object to defaultUser
      })
      
       // console.log(typeof this.user.id);
     } catch (error) {
       console.log(error);
     }
  }

 /*  save() {
    this.userService.updateUser(this.user.id, this.user).subscribe((data) => {
      console.log(data);
      alert('Profile updated successfully');
    }); */

    onImageSelected(event : any){
      if(event.target.files && event.target.files.length > 0){
        
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
      }
      }




      save(){
        const formData = new FormData();

        // apend the fields
        formData.append('name', this.user.name);
        formData.append('email', this.user.email);
        formData.append('age', this.user.age);
        formData.append('department', this.user.department);
        if(this.selectedFile){
          formData.append('image', this.selectedFile);
        }

        this.userService.updateUser(this.user.id,formData).subscribe({
          next: (response) =>{
            alert('Profile updated successfully');
            this.defaultUser = {...this.user};
            this.loadData();
          },
          error: (error) => {
            console.log(`error updating`,error);
            
            alert('Error updating profile');
          }})


        }


      }
    



      
    

    //data needs to be inserted in terms of formdata.append
 /*    save(){

    } */

  




/* 
If your importing a profile image to the User Dashboard

selectedFile: File | null = null;


  onImageSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  //upload image function
  uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('profileImage', this.selectedFile);
      this.userService.uploadProfileImage(this.user.id, formData).subscribe((response) => {
        this.user.profileImage = response.profileImageUrl; // Update the image URL
        alert('Profile image updated');
      });
    } else {
      alert('No file selected');
    }
  }

*/