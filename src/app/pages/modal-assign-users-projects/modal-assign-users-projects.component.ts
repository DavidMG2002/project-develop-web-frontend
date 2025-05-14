// Importación del módulo necesario para definir un componente en Angular.
import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-assign-users-projects', // Nombre con el que se usará el componente en el HTML.
  standalone: true, // Permite que el componente funcione de manera independiente sin necesidad de un módulo.
  imports: [], // Se pueden agregar módulos necesarios aquí si el componente los requiere.
  templateUrl: './modal-assign-users-projects.component.html', // Archivo que define la estructura visual del componente.
  styleUrl: './modal-assign-users-projects.component.scss' // Archivo donde se encuentran los estilos específicos del componente.
})
export class ModalAssignUsersProjectsComponent { // Definición de la clase principal del componente.

}

