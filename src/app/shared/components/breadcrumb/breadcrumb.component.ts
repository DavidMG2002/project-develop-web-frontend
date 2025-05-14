import { Component, Input } from '@angular/core';
import { FeatherModule } from 'angular-feather'; // Módulo para iconos en Angular.
import { RouterLink } from '@angular/router'; // Permite la navegación mediante enlaces en Angular.

@Component({
    selector: 'app-breadcrumb', // Define el nombre con el que se usará el componente en HTML.
    templateUrl: './breadcrumb.component.html', // Archivo que contiene la estructura visual del componente.
    styleUrls: ['./breadcrumb.component.scss'], // Archivo donde se encuentran los estilos específicos del componente.
    standalone: true, // Permite que el componente funcione sin necesidad de estar dentro de un módulo.
    imports: [RouterLink, FeatherModule], // Módulos que el componente necesita para funcionar correctamente.
})
export class BreadcrumbComponent { // Definición de la clase principal del componente.

  @Input()
  title!: string; // Propiedad de entrada que define el título del breadcrumb.

  @Input()
  items!: string[]; // Propiedad de entrada que recibe una lista de elementos del breadcrumb.

  @Input()
  active_item!: string; // Propiedad de entrada que indica el elemento activo del breadcrumb.

  constructor() {
    // Constructor del componente, donde pueden inicializarse variables si es necesario.
  }
}
