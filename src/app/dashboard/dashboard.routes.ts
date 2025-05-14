// Importación del módulo necesario para la gestión de rutas en Angular.
import { Route } from '@angular/router';

// Importación del componente principal que será mostrado en la ruta definida.
import { MainComponent } from './main/main.component';

// Definición de las rutas del dashboard en la aplicación.
export const DASHBOARD_ROUTE: Route[] = [
  {
    path: 'main', // Define la ruta '/main' dentro del dashboard.
    component: MainComponent // Indica que al acceder a '/main' se mostrará el MainComponent.
  },
];


