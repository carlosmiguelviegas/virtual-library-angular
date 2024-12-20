import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'reusable-button',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './reusable-button.component.html',
  styleUrl: './reusable-button.component.css'
})
export class ReusableButtonComponent implements OnInit {

  @Input() label!: string;
  @Input() type = 'button';
  @Input() func = 'primary';
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  color!: string;
  backgroundColor!: string;

  ngOnInit(): void {
    switch (this.func) {
      case 'primary':
        this.color = 'gold';
        this.backgroundColor = 'brown';
        break;
      case 'secondary':
        this.color = 'brown';
        this.backgroundColor = '#ffffff';
        break;
      default:
        this.color = 'gold';
        this.backgroundColor = 'brown';
        break;
    }
  }

  onButtonClick = (_event: any) => this.onClick.emit();

}
