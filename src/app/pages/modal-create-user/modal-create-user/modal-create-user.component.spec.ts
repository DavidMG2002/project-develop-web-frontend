// Importación de módulos necesarios para realizar pruebas unitarias en Angular.
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importación del componente que será probado.
import { ModalCreateUserComponent } from './modal-create-user.component';

describe('ModalCreateUserComponent', () => { // Define el bloque de pruebas para el componente.

  let component: ModalCreateUserComponent; // Almacena la instancia del componente.
  let fixture: ComponentFixture<ModalCreateUserComponent>; // Permite la interacción con la instancia del componente.

  // Configuración inicial antes de ejecutar las pruebas.
  beforeEach(async () => {
    await TestBed.configureTestingModule({ // Configura el entorno de pruebas.
      imports: [ModalCreateUserComponent] 
    })
    .compileComponents(); // Compila los componentes antes de ejecutar las pruebas.

    fixture = TestBed.createComponent(ModalCreateUserComponent); // Crea una instancia del componente.
    component = fixture.componentInstance; // Asigna la instancia del componente a la variable.
    fixture.detectChanges(); // Aplica cambios y actualiza la vista del componente.
  });

  // Prueba para verificar que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Comprueba que la instancia del componente es válida.
  });

});

