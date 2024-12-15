import { inject, Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../shared-components/dialogs/notification-dialog/notification-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

 dialog = inject(MatDialog);

  setMessage = (title: string, message: string) => {
    this.dialog.open(NotificationDialogComponent, {
      data: { title, message, displayOneButon: true  }
    });
  }

}
