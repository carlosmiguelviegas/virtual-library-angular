import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { User } from '../../models/User.model';
import { USER_CARD_ADMIN_ROLE, USER_CARD_INFORMATION, USER_CARD_NAME, USER_CARD_ROLE, USER_CARD_USER_ROLE } from '../../utils/titles-and-labels';

@Component({
  selector: 'user-card',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() user!: User;
  info = USER_CARD_INFORMATION;
  name = USER_CARD_NAME;
  role = USER_CARD_ROLE;
  adminRole = USER_CARD_ADMIN_ROLE;
  userRole = USER_CARD_USER_ROLE;

}
