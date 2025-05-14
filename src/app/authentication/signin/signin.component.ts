// Importación de módulos esenciales para el funcionamiento del componente.
import { Component, OnInit } from '@angular/core'; // Define un componente de Angular y la interfaz OnInit.
import { Router } from '@angular/router'; // Permite la navegación entre rutas de la aplicación.
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'; // Manejo de formularios y validaciones.
import { AuthService } from '@core'; // Servicio para gestionar autenticación de usuarios.
import { MatButtonModule } from '@angular/material/button'; // Botones de Angular Material.
import { MatFormFieldModule } from '@angular/material/form-field'; // Campos de formulario con diseño Material.
import { MatIconModule } from '@angular/material/icon'; // Íconos de Angular Material.
import { MatInputModule } from '@angular/material/input'; // Campos de entrada en formularios.
import Swal from 'sweetalert2'; // Biblioteca para mostrar alertas visuales al usuario.

@Component({
  selector: 'app-signin', // Nombre del selector HTML con el que se usará el componente.
  templateUrl: './signin.component.html', // Archivo que contiene la plantilla del componente.
  styleUrls: ['./signin.component.scss'], // Archivo con los estilos específicos del componente.
  imports: [
    FormsModule, // Permite manejar formularios tradicionales.
    ReactiveFormsModule, // Habilita la gestión de formularios reactivos en Angular.
    MatFormFieldModule, // Estilización de campos de formulario.
    MatInputModule, // Campos de entrada de texto con Material Design.
    MatIconModule, // Permite el uso de íconos dentro del formulario.
    MatButtonModule, // Permite estilizar botones con Angular Material.
  ],
  standalone: true, // Permite que el componente funcione de forma independiente sin necesidad de estar dentro de un módulo.
})
export class SigninComponent implements OnInit { // Definición de la clase del componente de inicio de sesión.
  
  // Se define el formulario de autenticación con validaciones.
  authForm!: UntypedFormGroup;
  
  // Variables de control del formulario y manejo de estados.
  submitted = false; // Controla si el formulario ha sido enviado.
  loading = false; // Indica si se está procesando la autenticación.
  returnUrl!: string; // Ruta a la que se redirigirá después del login.
  error = ''; // Guarda mensajes de error en caso de problemas.
  hide = true; // Controla la visibilidad de la contraseña.

  // Variables para capturar credenciales.
  email = ''; 
  password = '';

  constructor(
    private readonly formBuilder: UntypedFormBuilder, // Inyección de dependencia para construcción de formularios.
    private readonly router: Router, // Permite la navegación dentro de la aplicación.
    private readonly authService: AuthService, // Servicio de autenticación para iniciar sesión.
  ) { }

  // Método que se ejecuta al iniciar el componente, configurando el formulario.
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required], // Campo de usuario requerido.
      password: ['', Validators.required], // Campo de contraseña requerido.
    });
  }

  // Método para acceder fácilmente a los controles del formulario.
  get f() {
    return this.authForm.controls;
  }

  // Método que se ejecuta cuando el usuario presiona el botón de inicio de sesión.
  onSubmit() {
    this.submitted = true; // Marca el formulario como enviado.
    this.error = ''; // Reinicia el mensaje de error.

    // Si el formulario es inválido, muestra un mensaje de error con SweetAlert.
    if (this.authForm.invalid) {
      Swal.fire('Error', 'Usuario y contraseña no válidos.', 'error');
      return; // Detiene la ejecución si hay errores en el formulario.
    }

    // Llama al servicio de autenticación para iniciar sesión.
    this.authService
      .login(this.authForm.get('username')?.value, this.authForm.get('password')?.value)
      .subscribe({
        next: (res) => {
          if (res?.token) { // Si la respuesta del servicio contiene un token:
            sessionStorage.setItem('accessToken', res.token); // Guarda el token en el almacenamiento de sesión.
            console.log('Token recibido:', res.token); // Muestra el token en la consola para depuración.
            this.authService.setToken(res.token); // Actualiza el estado del usuario en el servicio de autenticación.

            // Muestra un mensaje de éxito con SweetAlert y redirige al dashboard.
            Swal.fire({
              title: 'Inicio de sesión exitoso',
              text: 'Redirigiendo al dashboard...',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            }).then(() => {
              this.router.navigate(['/dashboard/main']); // Redirección al panel principal tras el inicio de sesión.
            });
          } else {
            Swal.fire('Error', 'Credenciales incorrectas.', 'error'); // Muestra un mensaje de error si la autenticación falla.
          }
        },
        error: (error) => {
          this.submitted = false;
          this.loading = false;
          Swal.fire('Error en el inicio de sesión', error.error?.message || 'Error desconocido', 'error'); // Muestra mensajes de error dinámicos.
        }
      });
  }

}
