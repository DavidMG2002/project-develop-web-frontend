// Importación del decorador necesario para definir un servicio en Angular.
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Indica que el servicio estará disponible de manera global en la aplicación.
})
export class ProjectsService { // Definición del servicio ProjectsService.

  constructor() { 
    // Constructor del servicio. Aquí pueden inyectarse dependencias si es necesario.
  }

}

