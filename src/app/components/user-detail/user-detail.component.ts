import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  @Input() user: any;
}
