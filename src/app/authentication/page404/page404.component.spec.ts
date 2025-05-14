// Importa los módulos necesarios para realizar pruebas unitarias en Angular.
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Page404Component } from './page404.component';

// Se define el bloque de pruebas para el componente Page404Component.
describe('Page404Component', () => {
  
  // Se declaran las variables necesarias para realizar pruebas sobre el componente.
  let component: Page404Component;
  let fixture: ComponentFixture<Page404Component>;

  // Se ejecuta antes de cada prueba asincrónica, inicializando el módulo de prueba.
  beforeEach(waitForAsync(() => {
    
    // Configura el módulo de prueba para incluir el Page404Component.
    TestBed.configureTestingModule({
      imports: [Page404Component]
    }).compileComponents(); // Compila los componentes antes de ejecutar las pruebas.

  }));

  // Antes de cada prueba, se crea la instancia del componente y se actualiza la vista.
  beforeEach(() => {
    fixture = TestBed.createComponent(Page404Component); // Crea una instancia del componente.
    component = fixture.componentInstance; // Asigna la instancia al objeto de prueba.
    fixture.detectChanges(); // Aplica los cambios para actualizar la vista.
  });

  // Prueba que verifica si el componente se creó correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Comprueba que la instancia del componente es válida.
  });

});

