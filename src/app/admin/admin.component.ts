import { Component } from '@angular/core';
import { UserService } from '../user.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  users:any[] = []
  displayedColumns: string[] = ['id','name','email','department','action','edit'];
  selectedUser:any = {}; // to store the selected user
  
  
 
 
  constructor(private userService : UserService){}

  ngOnInit(){
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data
      
      
      // console.log(data);
      const token = sessionStorage.getItem('token');
    console.log(token);

   
      
    })
  }


  //delete user
  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe((data: any) => {
      this.users = this.users.filter((user: any) => user.id !== id) // remove user from array
    })
  }

  //search username
 searchTerm:string = '';


//  clear the search
clearSearch(){
  this.searchTerm = '';
  this.ngOnInit();
}

sortOrder : string = 'asc'

toggleSort(){
  this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
  console.log(this.sortOrder);
  
  this.searchUser()
}

 searchUser(){
  this.userService.searchUser(this.searchTerm,this.sortOrder).subscribe((data:any)=>{
    this.users = data
  })
 }


 //for the edit modal
 setSelectedUser(user: any){
  this.selectedUser = {...user}; // create a copy of the user object  
  console.log(this.selectedUser);
   
 }

  //update user
  updateUser(user:any){
    console.log(user);
    const formData = new FormData;
    formData.append('name',user.name);
    formData.append('email',user.email);
    formData.append('age',user.age);
    formData.append('department',user.department);
    formData.append('image',user.image);
    this.userService.updateUser(user.id,formData).subscribe({
      next: (response) => {
        alert('User updated successfully')
        this.ngOnInit() // refresh the user list
      },
      error: (error) => {
        console.log(error)
      }
    })
  /*   this.userService.updateUser(this.selectedUser.id,this.selectedUser).subscribe({
      next: (response) => {
        alert('User updated successfully')
        this.ngOnInit() // refresh the user list
      },
      error: (error) => {
        console.log(error)
      }
    }) */
  }


}
