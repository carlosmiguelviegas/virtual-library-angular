import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'button-card',
  standalone: true,
  imports: [ CommonModule, MatIconModule, MatIcon, MatTooltipModule ],
  templateUrl: './button-card.component.html',
  styleUrl: './button-card.component.css'
})
export class ButtonCardComponent {

  @Input() icon!: string;
  @Input() tooltip!: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  onButtonClick = (_event: any) => this.onClick.emit();

}
