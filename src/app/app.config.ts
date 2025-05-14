// Importación de módulos necesarios para la configuración global de la aplicación en Angular.
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http'; // Manejo de solicitudes HTTP y configuración de interceptores.
import { ApplicationConfig, importProvidersFrom } from '@angular/core'; // Configuración general de la aplicación Angular.
import { APP_ROUTE } from './app.routes'; // Importación de las rutas definidas en la aplicación.
import { provideRouter } from '@angular/router'; // Proveedor para la gestión de rutas en Angular.
import { provideAnimations } from '@angular/platform-browser/animations'; // Habilita animaciones en Angular.
import { LocationStrategy, PathLocationStrategy } from '@angular/common'; // Configuración de estrategias de ubicación en la navegación.
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core'; // Configuración de fechas en Angular Material.
import { MomentDateAdapter } from '@angular/material-moment-adapter'; // Adaptador para manejar fechas usando Moment.js.
import { FeatherModule } from 'angular-feather'; // Módulo para importar íconos de Feather.
import { allIcons } from 'angular-feather/icons'; // Colección de todos los íconos de Feather.
import { provideCharts, withDefaultRegisterables } from 'ng2-charts'; // Configuración de gráficos utilizando ng2-charts.
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Soporte para animaciones asíncronas en Angular.
import { JwtInterceptor } from '@core/interceptor/jwt.interceptor'; // Interceptor para gestionar autenticación JWT en las solicitudes HTTP.

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // Configuración de cliente HTTP para manejar solicitudes.
    provideRouter(APP_ROUTE), // Configuración de rutas en la aplicación.
    provideAnimations(), // Habilita las animaciones de Angular.
    
    // Configuración de la estrategia de ubicación de rutas.
    { provide: LocationStrategy, useClass: PathLocationStrategy },

    // Configuración del adaptador de fechas usando Moment.js.
    { provide: DateAdapter, useClass: MomentDateAdapter },

    // Definición de formatos de fecha para la aplicación.
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'YYYY-MM-DD',
        },
        display: {
          dateInput: 'YYYY-MM-DD',
          monthYearLabel: 'YYYY MMM',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'YYYY MMM',
        },
      },
    },

    // Configuración del interceptor JWT para manejar autenticación en solicitudes HTTP.
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    // Importa los íconos de Feather en la aplicación.
    importProvidersFrom(FeatherModule.pick(allIcons)),

    // Configuración del sistema de gráficos con valores predeterminados.
    provideCharts(withDefaultRegisterables()),

    // Configuración del cliente HTTP con soporte para interceptores.
    provideHttpClient(withInterceptorsFromDi()),

    // Habilitación de animaciones de manera asíncrona.
    provideAnimationsAsync(),
  ],
};

