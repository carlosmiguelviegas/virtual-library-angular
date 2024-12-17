import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { LOGOUT_LINK, SIGN_IN_LINK, SIGN_UP_LINK } from '../../../utils/titles-and-labels';

@Component({
  selector: 'navigation-bar',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {

  auth = inject(AuthService);
  
  @Input() list!: string[];
  @Input() isLoggedIn!: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  login = SIGN_IN_LINK;
  register = SIGN_UP_LINK;
  logout = LOGOUT_LINK;

  onLogOut = () => this.onClick.emit();

}
