import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'reusable-button',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './reusable-button.component.html',
  styleUrl: './reusable-button.component.css'
})
export class ReusableButtonComponent {

  @Input() label!: string;
  @Input() type: string = 'button';
  @Input() color: string = '#03A9F4';
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  onButtonClick = (_event: any) => {
    this.onClick.emit();
  };

}
