// Importa los módulos necesarios para el funcionamiento del componente.
import { Component } from '@angular/core'; // Permite definir el componente en Angular.
import { Router } from '@angular/router'; // Usado para la navegación dentro de la aplicación.
import { MatButtonModule } from '@angular/material/button'; // Módulo de Angular Material para botones.
import { FormsModule } from '@angular/forms'; // Módulo para manejar formularios en Angular.

@Component({
    selector: 'app-page404', // Define el nombre con el que se usará el componente en el HTML.
    templateUrl: './page404.component.html', // Archivo que contiene la estructura visual del componente.
    styleUrls: ['./page404.component.scss'], // Archivo con los estilos específicos del componente.
    standalone: true, // Indica que el componente no depende de un módulo externo.
    imports: [
        FormsModule, // Se importa para manejar formularios dentro del componente.
        MatButtonModule, // Se importa para usar botones estilizados con Angular Material.
    ],
})
export class Page404Component { // Se define la clase del componente

  constructor(
    private _router: Router // Se inyecta el servicio de Router para manejar la navegación.
  ) {
    
  }

  // Método que redirige al usuario a la página principal cuando presiona el botón.
  redirectHome() {
    this._router.navigate(['/dashboard/main']);
  }

}

