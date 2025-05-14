import { CommonModule } from '@angular/common'; // Módulo común de Angular.
import { Component } from '@angular/core'; // Decorador para definir un componente.
import { Event, Router, NavigationStart, NavigationEnd, RouterModule } from '@angular/router'; // Módulos para el control de rutas en Angular.

@Component({
  selector: 'app-root', // Define el nombre con el que se usará el componente en HTML.
  standalone: true, // Indica que el componente funciona de manera independiente sin necesidad de un módulo.
  imports: [CommonModule, RouterModule], // Importación de módulos necesarios.
  templateUrl: './app.component.html', // Archivo que contiene la estructura visual del componente.
  styleUrls: ['./app.component.scss'], // Archivo donde se encuentran los estilos específicos del componente.
})
export class AppComponent { // Definición de la clase principal del componente.

  currentUrl!: string; // Variable para almacenar la URL actual.

  constructor(public _router: Router) { // Inyección del servicio Router para gestionar la navegación.
    this._router.events.subscribe((routerEvent: Event) => { // Suscripción a los eventos de navegación.

      if (routerEvent instanceof NavigationStart) { // Se ejecuta al iniciar una nueva navegación.
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf('/') + 1 // Extrae la última parte de la URL actual.
        );
      }

      if (routerEvent instanceof NavigationEnd) { 
        /* Evento de finalización de la navegación (actualmente sin lógica adicional). */
      }

      window.scrollTo(0, 0); // Desplaza automáticamente la ventana al inicio después de una navegación.
    });
  }
}

