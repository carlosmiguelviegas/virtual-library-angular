import { Component, Inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from './../../../models/Notification.model';
import { ReusableButtonComponent } from './../../buttons/reusable-button/reusable-button.component';

@Component({
  selector: 'notification-dialog',
  standalone: true,
  imports: [ MatCardModule, ReusableButtonComponent ],
  templateUrl: './notification-dialog.component.html',
  styleUrl: './notification-dialog.component.css'
})
export class NotificationDialogComponent {

  constructor(private dialogRef: MatDialogRef<NotificationDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: Notification) {}

  onClose = () => this.dialogRef.close('ok')

  onConfirm = () => this.dialogRef.close('yes'); 

}
