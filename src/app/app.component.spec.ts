import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Importación del componente principal de la aplicación.
import { AppComponent } from './app.component';

describe('AppComponent', () => { // Define el bloque de pruebas para el componente AppComponent.

  // Configuración inicial antes de ejecutar las pruebas.
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({ // Configura el entorno de pruebas.
      imports: [RouterTestingModule], // Importa el módulo de pruebas de rutas para evitar errores de navegación.
      declarations: [AppComponent] // Declara el componente que será probado.
    }).compileComponents(); // Compila los componentes antes de ejecutar las pruebas.
  }));

  // Prueba para verificar que el componente de la aplicación se crea correctamente.
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent); // Crea una instancia del componente.
    const app = fixture.debugElement.componentInstance; // Obtiene la instancia del componente.
    expect(app).toBeTruthy(); // Comprueba que la instancia del componente es válida.
  });

  // Prueba para verificar que la propiedad "title" del componente tiene el valor esperado.
  it(`should have as title 'angulardark'`, () => {
    const fixture = TestBed.createComponent(AppComponent); // Crea una instancia del componente.
    const app = fixture.debugElement.componentInstance; // Obtiene la instancia del componente.
    expect(app.title).toEqual('angulardark'); // Comprueba que la propiedad "title" es correcta.
  });

  // Prueba para verificar que el título se renderiza en una etiqueta <h1>.
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent); // Crea una instancia del componente.
    fixture.detectChanges(); // Aplica cambios y actualiza la vista del componente.
    const compiled = fixture.debugElement.nativeElement; // Obtiene el elemento HTML del componente.
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to angulardark!' // Verifica que el contenido del <h1> es el esperado.
    );
  });

});

