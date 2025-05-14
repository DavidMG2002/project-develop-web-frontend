// Importación de módulos necesarios 
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importación del componente que será probado.
import { ModalAssignUsersProjectsComponent } from './modal-assign-users-projects.component';

describe('ModalAssignUsersProjectsComponent', () => { // Definición del bloque de pruebas para el componente.

  let component: ModalAssignUsersProjectsComponent; // Variable que almacena la instancia del componente.
  let fixture: ComponentFixture<ModalAssignUsersProjectsComponent>; // Permite la interacción con la instancia del componente.

  // Configuración inicial antes de ejecutar las pruebas.
  beforeEach(async () => {
    await TestBed.configureTestingModule({ // Configura el entorno de pruebas.
      imports: [ModalAssignUsersProjectsComponent] //  Posible error: Normalmente se usa "declarations" en lugar de "imports".
    })
    .compileComponents(); // Compila los componentes antes de ejecutar las pruebas.

    fixture = TestBed.createComponent(ModalAssignUsersProjectsComponent); // Crea una instancia del componente.
    component = fixture.componentInstance; // Asigna la instancia del componente a la variable.
    fixture.detectChanges(); // Aplica cambios y actualiza la vista del componente.
  });

  // Prueba para verificar que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Comprueba que la instancia del componente es válida.
  });

});

