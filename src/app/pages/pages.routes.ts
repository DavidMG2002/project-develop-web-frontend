// Importación de módulos necesarios para la gestión de rutas en Angular.
import { Route } from "@angular/router";

// Importación de los componentes que serán utilizados en las rutas.
import { UsersComponent } from "./users/users/users.component"; // Componente para la gestión de usuarios.
import { ProjectsComponent } from "./projects/projects.component"; // Componente para la gestión de proyectos.

// Importación del guard de administrador, que protege el acceso a ciertas rutas.
import { AdminGuard } from "@core/guard/admin.guard"; 

// Definición del conjunto de rutas para la sección "PAGES".
export const PAGES_ROUTE: Route[] = [
    {
        path: "users", // Ruta para gestionar usuarios.
        component: UsersComponent, // Especifica el componente que se cargará cuando se acceda a "/users".
        canActivate: [AdminGuard] // Restringe el acceso a la ruta solo para administradores.
    },
    {
        path: "projects", // Ruta para gestionar proyectos.
        component: ProjectsComponent, // Especifica el componente que se cargará cuando se acceda a "/projects".
    },
];
