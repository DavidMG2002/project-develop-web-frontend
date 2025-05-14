// Importación de módulos necesarios para la creación del componente en Angular.
import { Component, Input } from '@angular/core';
import { FeatherModule } from 'angular-feather'; // Módulo para manejar iconos en Angular usando Feather Icons.

@Component({
    selector: 'app-feather-icons', // Define el nombre con el que se usará el componente en HTML.
    templateUrl: './feather-icons.component.html', // Archivo que contiene la estructura visual del componente.
    styleUrls: ['./feather-icons.component.scss'], // Archivo donde se encuentran los estilos específicos del componente.
    standalone: true, // Indica que el componente no depende de un módulo externo.
    imports: [FeatherModule], // Importa el módulo FeatherModule para manejar iconos SVG en Angular.
})
export class FeatherIconsComponent { // Definición de la clase principal del componente.

  @Input() public icon?: string; // Propiedad de entrada para definir el nombre del icono a mostrar.
  @Input() public class?: string; // Propiedad de entrada para definir clases CSS adicionales.

  constructor() {
    // Constructor del componente, aquí podrían inicializarse valores si fuera necesario.
  }
}

