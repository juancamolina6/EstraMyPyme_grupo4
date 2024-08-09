import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../components/user-detail/user-detail.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private usersSource = new BehaviorSubject<User[]>([]);
  users$ = this.usersSource.asObservable();

  setUsers(users: User[]) {
    this.usersSource.next(users);
  }
}
