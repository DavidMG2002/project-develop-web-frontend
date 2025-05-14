// Importación del módulo necesario para definir un componente en Angular.
import { Component } from '@angular/core';

@Component({
  selector: 'app-main', // Define el nombre con el que se usará el componente en los archivos HTML.
  templateUrl: './main.component.html', // Archivo que contiene la estructura visual del componente.
  styleUrls: ['./main.component.scss'], // Archivo con los estilos específicos del componente.
  standalone: true, // Permite que el componente funcione sin necesidad de estar dentro de un módulo.
  imports: [ ], // Se pueden agregar módulos necesarios aquí cuando se requieran.
})
export class MainComponent { // Definición de la clase principal del componente.

  constructor() { 
    // Constructor del componente, donde pueden inyectarse dependencias si es necesario.
  }
  
}

