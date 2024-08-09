import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user-detail/user-detail.component';
import { UsersService } from '../../services/user.service';
import { SharedService } from '../../services/shared.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users: User[] = [];
  @Output() userSelected = new EventEmitter<User>();
  selectedUserType: string = 'Profesores';
  selectedUser: User | null = null;
  searchTerm: string = '';

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.users$.subscribe(users => {
      this.users = users;
      if (this.filteredUsers.length > 0) {
        this.selectUser(this.filteredUsers[0]);
      }
    });
  }

  get filteredUsers() {
    return this.users.filter(user =>
      user.type.toLowerCase() === this.selectedUserType.toLowerCase() &&
      ((user.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        user.nombre?.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  selectUser(user: User) {
    this.userSelected.emit(user);
    this.selectedUser = user;
  }

  updateUser(updatedUser: User) {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.selectUser(updatedUser);
    }
  }
}
