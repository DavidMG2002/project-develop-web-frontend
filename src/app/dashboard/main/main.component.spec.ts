//  Importación de los módulos necesarios para realizar pruebas unitarias en Angular.
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'; //  Permite crear y ejecutar pruebas en componentes.
import { MainComponent } from './main.component'; //  Importa el componente que será probado.

describe('MainComponent', () => { //  Bloque de pruebas para el componente MainComponent.

  //  Variables para gestionar el componente y su entorno de pruebas.
  let component: MainComponent; // Almacena la instancia del componente.
  let fixture: ComponentFixture<MainComponent>; // Permite la interacción con la instancia del componente.

  //  Configuración inicial antes de ejecutar las pruebas.
  beforeEach(waitForAsync(() => { //  Ejecuta la configuración de manera asincrónica.
    
    //  Configura el entorno de pruebas e importa el componente.
    TestBed.configureTestingModule({
      imports: [MainComponent] //  Posible error: Se suele usar "declarations" en lugar de "imports" para un componente.
    }).compileComponents(); //  Compila los componentes antes de ejecutar las pruebas.

  }));

  //  Se ejecuta antes de cada prueba para crear la instancia del componente.
  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent); //  Crea una instancia del componente.
    component = fixture.componentInstance; //  Asigna la instancia del componente a la variable.
    fixture.detectChanges(); //  Aplica cambios y actualiza la vista del componente.
  });

  //  Prueba para verificar que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); //  Comprueba que la instancia del componente es válida.
  });

});

