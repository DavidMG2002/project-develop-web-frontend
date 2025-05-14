// 📌 Importaciones necesarias para la configuración de servicios en Angular.
import { Injectable } from '@angular/core'; // Permite que este servicio sea inyectable en otros componentes.
import { InConfiguration } from '../core/models/config.interface'; // Interfaz que define la estructura de configuración.

@Injectable({
  providedIn: 'root', // Define que el servicio estará disponible en toda la aplicación.
})
export class ConfigService { // 📌 Servicio que maneja la configuración de la interfaz de usuario.
  
  public configData!: InConfiguration; // Variable pública que almacena la configuración actual.

  constructor() {
    this.setConfigData(); // Al crear la instancia, inicializa la configuración predeterminada.
  }

  // 📌 Método que se ejecuta al iniciar el servicio, cargando los datos de configuración.
  ngOnInit() {
    this.loadConfigData();
  }

  // 📌 Método para establecer la configuración inicial de la aplicación.
  setConfigData() {
    this.configData = {
      layout: {
        rtl: false, // 🔹 Indica si el diseño será de derecha a izquierda (false = modo estándar).
        variant: 'light', // 🔹 Define el modo visual: "light" (claro) o "dark" (oscuro).
        theme_color: 'cyan', // 🔹 Color principal del tema (Opciones: white, black, purple, blue, cyan, green, orange).
        logo_bg_color: 'white', // 🔹 Color de fondo del logo (Opciones: white, black, purple, blue, cyan, green, orange).
        sidebar: {
          collapsed: false, // 🔹 Determina si la barra lateral estará contraída o expandida.
          backgroundColor: 'light', // 🔹 Color de fondo de la barra lateral ("light" para claro, "dark" para oscuro).
        },
      },
    };

    // Guarda la configuración en localStorage para persistencia entre sesiones.
    localStorage.setItem('configData', JSON.stringify(this.configData));
  }

  // 📌 Método que carga la configuración desde el almacenamiento local (si existe).
  loadConfigData() {
    const configData = localStorage.getItem('configData'); // 🔹 Obtiene los datos guardados en localStorage.
    
    if (configData) {
      this.configData = JSON.parse(configData); // 🔹 Si hay datos, los convierte en un objeto y los asigna.
    } else {
      this.setConfigData(); // 🔹 Si no hay datos, establece la configuración predeterminada.
    }
  }
}

