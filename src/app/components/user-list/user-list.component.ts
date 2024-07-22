import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user-detail/user-detail.component';
import { UsersService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Output() userSelected = new EventEmitter<User>();
  users: User[] = [];
  selectedUserType: string = 'Estudiantes';
  selectedUser: User | null = null;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.loadUsers();
  }

  get filteredUsers() {
    return this.users.filter(user => user.type === this.selectedUserType);
  }

  selectUser(user: User) {
    this.userSelected.emit(user);
    this.selectedUser = user;
  }

  selectDefaultUser() {
    const usersOfSelectedType = this.filteredUsers;
    if (usersOfSelectedType.length > 0) {
      this.selectUser(usersOfSelectedType[0]);
    }
  }

  private loadUsers() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
      this.selectDefaultUser();
    });
  }
}
