import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'button-card',
  standalone: true,
  imports: [ CommonModule, MatIconModule, MatIcon ],
  templateUrl: './button-card.component.html',
  styleUrl: './button-card.component.css'
})
export class ButtonCardComponent {

  @Input() icon!: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  onButtonClick = (_event: any) => this.onClick.emit();

}
