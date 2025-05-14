// Importa los módulos necesarios para realizar pruebas unitarias en Angular.
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SigninComponent } from './signin.component';

// Se define el bloque de pruebas para el componente SigninComponent.
describe('SigninComponent', () => {

  // Se declaran variables que se usarán para probar el componente.
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  // Antes de cada prueba asincrónica, se configura el módulo de prueba.
  beforeEach(waitForAsync(() => {

    // Se crea el entorno de pruebas e importa el componente que será evaluado.
    TestBed.configureTestingModule({
      imports: [SigninComponent]
    }).compileComponents(); // Compila los componentes antes de ejecutar las pruebas.

  }));

  // Antes de ejecutar cada prueba, se instancia el componente y se actualiza la vista.
  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent); // Crea la instancia del componente de inicio de sesión.
    component = fixture.componentInstance; // Asigna la instancia del componente a la variable.
    fixture.detectChanges(); // Aplica los cambios y actualiza la vista del componente.
  });

  // Prueba para verificar que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Comprueba que la instancia del componente sea válida.
  });

});

