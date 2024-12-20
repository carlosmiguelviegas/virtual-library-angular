import { Component, Inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from './../../../models/Notification.model';
import { ReusableButtonComponent } from './../../buttons/reusable-button/reusable-button.component';
import { NOTIFICATIONS_NO_LABEL, NOTIFICATIONS_OK_LABEL, NOTIFICATIONS_YES_LABEL } from '../../../utils/titles-and-labels';

@Component({
  selector: 'notification-dialog',
  standalone: true,
  imports: [ MatCardModule, ReusableButtonComponent ],
  templateUrl: './notification-dialog.component.html',
  styleUrl: './notification-dialog.component.css'
})
export class NotificationDialogComponent {

  OK_LABEL = NOTIFICATIONS_OK_LABEL;
  YES_LABEL = NOTIFICATIONS_YES_LABEL;
  NO_LABEL = NOTIFICATIONS_NO_LABEL;

  constructor(private dialogRef: MatDialogRef<NotificationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Notification) {}

  onClose = () => this.dialogRef.close('ok')

  onConfirm = () => this.dialogRef.close('yes'); 

}
