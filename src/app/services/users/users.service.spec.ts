// Importación del módulo necesario para configurar pruebas unitarias en Angular.
import { TestBed } from '@angular/core/testing';

// Importación del servicio que será probado.
import { UsersService } from './users.service';

describe('UsersService', () => { // Define el bloque de pruebas para el servicio UsersService.

  let service: UsersService; // Variable que almacena la instancia del servicio.

  // Configuración inicial antes de ejecutar las pruebas.
  beforeEach(() => {
    TestBed.configureTestingModule({}); // Configura el entorno de pruebas sin dependencias adicionales.
    service = TestBed.inject(UsersService); // Inyecta el servicio en el entorno de pruebas.
  });

  // Prueba para verificar que el servicio se crea correctamente.
  it('should be created', () => {
    expect(service).toBeTruthy(); // Comprueba que la instancia del servicio es válida.
  });

});
