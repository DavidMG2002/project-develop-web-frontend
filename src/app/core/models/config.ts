// 📌 Importación del archivo de configuración del entorno.
import { environment } from "environments/environment"; 
//  Se obtiene la configuración desde el archivo de entorno, lo que permite manejar valores dinámicos según el ambiente (desarrollo, producción, etc.).

// 📌 Definición de constantes que extraen valores del entorno.
export const URL_SERVICIOS = environment.urlServicios; 
//  Esta constante almacena la URL de los servicios, lo que permite acceder a las API sin necesidad de definirlas manualmente en cada módulo.

// 📌 Definición del tiempo de cierre de sesión automático.
export const LOGOUT_TIMEOUT = environment.logoutTimeout; 
//  Define el tiempo límite antes de cerrar sesión automáticamente por inactividad, mejorando la seguridad de la aplicación.


