// 📌 Definición de la interfaz de configuración para la aplicación.
export interface InConfiguration {
  
  // 📌 Configuración general del diseño de la aplicación.
  layout: {
    rtl: boolean; //  Indica si el diseño debe ser de derecha a izquierda (true) o estándar (false).
    variant: string; //  Define el modo visual de la aplicación, opciones posibles: "light" (claro) o "dark" (oscuro).
    theme_color: string; //  Color principal del tema, opciones: "white", "black", "purple", "blue", "cyan", "green", "orange".
    logo_bg_color: string; // Color de fondo del logo, con las mismas opciones que "theme_color".
    
    // 📌 Configuración específica para la barra lateral de navegación.
    sidebar: {
      collapsed: boolean; //  Indica si la barra lateral debe estar contraída (true) o expandida (false) por defecto.
      backgroundColor: string; //  Define el color de fondo de la barra lateral, opciones: "light" o "dark".
    };
  };
}
