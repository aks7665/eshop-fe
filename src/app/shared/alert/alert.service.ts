import { Injectable } from '@angular/core';
import { MatSnackBarModule, MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public snackBar: MatSnackBar) {}

  /**
   *
   * @param message Message - everything is broken
   * @param type success/error/warning/info/show
   */
  showSnackbar(message, type?): void {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    config.panelClass = 'custom-snackbar';
    this.snackBar.open(message, undefined, config);
  }

}
