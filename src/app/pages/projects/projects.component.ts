import { Component } from '@angular/core';

@Component({
  selector: 'app-projects', // Define el nombre con el que se usará el componente en los archivos HTML.
  standalone: true, // Indica que el componente puede funcionar de manera independiente, sin estar dentro de un módulo.
  imports: [], // Lista de módulos necesarios para el componente. Se pueden agregar si son requeridos.
  templateUrl: './projects.component.html', // Archivo que contiene la estructura visual del componente.
  styleUrl: './projects.component.scss' // Archivo donde se encuentran los estilos específicos del componente.
})
export class ProjectsComponent { // Definición de la clase principal del componente.

}

