// 📌 Importación de módulos necesarios para la gestión de rutas en Angular.
import { Route } from "@angular/router"; // Permite definir rutas dentro de la aplicación.
import { SigninComponent } from "./signin/signin.component"; // Componente para la página de inicio de sesión.
import { Page404Component } from "./page404/page404.component"; // Componente para la página de error 404.

// 📌 Definición de las rutas de autenticación en la aplicación.
export const AUTH_ROUTE: Route[] = [
  
  // Ruta raíz ("/") → Redirige automáticamente a la página de inicio de sesión.
  {
    path: "",
    redirectTo: "signin", // Redirige a la ruta "/signin".
    pathMatch: "full", // Indica que la ruta debe coincidir exactamente.
  },

  // Ruta para el inicio de sesión.
  {
    path: "signin",
    component: SigninComponent, // Carga el componente de inicio de sesión.
  },

  // Ruta para la página de error 404.
  {
    path: "page404",
    component: Page404Component, // Carga el componente que muestra el mensaje de error.
  },

  // 📌 Captura cualquier ruta no definida y la redirige a la página 404.
  { 
    path: '**', // Wildcard → Cubre cualquier ruta no especificada.
    redirectTo: 'page404', // Redirige a la pantalla de error.
    pathMatch: 'full', // Coincidencia exacta de la ruta.
  },

];

