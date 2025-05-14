import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importación del componente que será probado.
import { FeatherIconsComponent } from './feather-icons.component';

describe('FeatherIconsComponent', () => { // Define el bloque de pruebas para el componente FeatherIconsComponent.

  let component: FeatherIconsComponent; // Almacena la instancia del componente.
  let fixture: ComponentFixture<FeatherIconsComponent>; // Permite la interacción con la instancia del componente.

  // Configuración inicial antes de ejecutar las pruebas.
  beforeEach(async () => {
    await TestBed.configureTestingModule({ // Configura el entorno de pruebas.
      imports: [FeatherIconsComponent] 
    })
    .compileComponents(); // Compila los componentes antes de ejecutar las pruebas.
  });

  // Se ejecuta antes de cada prueba para crear la instancia del componente.
  beforeEach(() => {
    fixture = TestBed.createComponent(FeatherIconsComponent); // Crea una instancia del componente.
    component = fixture.componentInstance; // Asigna la instancia del componente a la variable.
    fixture.detectChanges(); // Aplica cambios y actualiza la vista del componente.
  });

  // Prueba para verificar que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Comprueba que la instancia del componente es válida.
  });

});
