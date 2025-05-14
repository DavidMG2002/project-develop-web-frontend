// Importación de los módulos necesarios para manejar notificaciones en Angular Material.
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root' // Define que el servicio estará disponible en toda la aplicación.
})
export class AlertService { // Servicio para mostrar notificaciones emergentes.

  constructor(private _snackBar: MatSnackBar) { } // Inyecta el servicio MatSnackBar para manejar notificaciones.

  /**
   * Muestra una notificación con configuraciones personalizadas.
   * @param colorName Clase de estilo aplicada a la notificación.
   * @param text Texto que se mostrará en la notificación.
   * @param placementFrom Posición vertical de la notificación (por defecto: "bottom").
   * @param placementAlign Posición horizontal de la notificación (por defecto: "center").
   */
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition = 'bottom',
    placementAlign: MatSnackBarHorizontalPosition = 'center'
  ) {
    this._snackBar.open(text, '', { // Muestra la notificación con los parámetros definidos.
      duration: 5000, // Tiempo de duración en pantalla (5000ms = 5 segundos).
      verticalPosition: placementFrom, // Posición vertical de la notificación.
      horizontalPosition: placementAlign, // Posición horizontal de la notificación.
      panelClass: colorName, // Aplica estilos personalizados a la notificación.
    });
  }
}

