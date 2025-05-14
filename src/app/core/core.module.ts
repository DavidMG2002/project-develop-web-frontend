// 📌 Importación de los módulos esenciales para la estructura del núcleo de la aplicación.
import { NgModule } from '@angular/core'; //  Permite definir un módulo en Angular.
import { CommonModule } from '@angular/common'; //  Contiene funciones y utilidades comunes para Angular.
import { AuthGuard } from './guard/auth.guard'; //  Protección de rutas mediante verificación de autenticación.
import { AuthService } from './service/auth.service'; //  Servicio de autenticación para gestionar el inicio de sesión y tokens.
import { AdminGuard } from './guard/admin.guard'; //  Protección adicional para rutas exclusivas de administradores.

@NgModule({
  declarations: [], //  Aquí se pueden definir componentes, directivas o pipes si fueran necesarios.
  imports: [CommonModule], //  Se importa el módulo común de Angular para tener acceso a sus funciones básicas.
  providers: [
    AuthGuard, //  Guarda que restringe acceso a usuarios no autenticados.
    AdminGuard, //  Guarda que restringe acceso solo a usuarios con rol de administrador.
    AuthService, //  Servicio de autenticación para gestionar la sesión del usuario.
  ],
})
export class CoreModule { } 

