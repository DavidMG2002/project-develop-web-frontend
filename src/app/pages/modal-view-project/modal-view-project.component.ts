// Importación de módulos esenciales de Angular y Angular Material
import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';

// Declaración del componente Angular
@Component({
  selector: 'app-modal-view-project', // Nombre del selector que identifica el componente
  standalone: true, // Indica que el componente no depende de un módulo global
  imports: [
    CommonModule, // Módulo común de Angular para funciones estándar
    MatDialogModule, // Módulo de Angular Material para diálogos emergentes
    MatButtonModule, // Módulo de Angular Material para botones
    MatIconModule, // Módulo de Angular Material para iconos
    MatDialogActions, // Componente de Angular Material para botones de acciones en el diálogo
    MatDialogTitle, // Componente de Angular Material para el título del diálogo
    MatDialogContent, // Componente de Angular Material para el contenido del diálogo
  ],
  templateUrl: './modal-view-project.component.html', // Ruta de la plantilla HTML del componente
  styleUrls: ['./modal-view-project.component.scss'] // Ruta de los estilos CSS del componente
})
export class ModalViewProjectComponent implements OnInit {

  // Constructor del componente con inyección de dependencias
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos pasados al modal mediante Angular Material
    private readonly dialogRef: MatDialogRef<ModalViewProjectComponent> // Referencia al diálogo para controlar su cierre
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    console.log('Datos del proyecto:', this.data); // Imprime los datos del proyecto en la consola para depuración
  }

  // Método para cerrar el modal cuando el usuario haga clic en el botón
  closeModal(): void {
    this.dialogRef.close(); // Cierra el diálogo sin devolver datos
  }
}
