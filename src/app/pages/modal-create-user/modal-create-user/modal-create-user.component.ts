// Importaciones necesarias para la creación del componente y gestión de formularios.
import { Component, Inject, OnInit } from '@angular/core'; // Define el componente y maneja la inyección de dependencias.
import { CommonModule } from '@angular/common'; // Proporciona funciones esenciales para Angular.
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms'; // Manejo de formularios reactivos y validaciones.
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog'; // Manejo de diálogos en Angular Material.
import { MatFormFieldModule } from '@angular/material/form-field'; // Campos de formulario con Material Design.
import { MatButtonModule } from '@angular/material/button'; // Botones de Angular Material.
import { MatInputModule } from '@angular/material/input'; // Campos de entrada en formularios.
import { MatSelectModule } from '@angular/material/select'; // Select de Angular Material.
import { MatIconModule } from '@angular/material/icon'; // Iconos de Angular Material.
import { UsersService } from 'app/services/users/users.service'; // Servicio para gestionar usuarios.
import { debounceTime, distinctUntilChanged } from 'rxjs'; // Operadores para optimizar la validación de formularios.
import { MatSnackBar } from '@angular/material/snack-bar'; // Notificaciones emergentes en Angular Material.
import Swal from 'sweetalert2'; // Biblioteca para mostrar alertas visuales al usuario.

@Component({
  selector: 'app-modal-create-user', // Nombre del componente en HTML.
  standalone: true, // Indica que el componente no depende de un módulo externo.
  imports: [ // Módulos utilizados dentro del componente.
    CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatSelectModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, ReactiveFormsModule
  ],
  templateUrl: './modal-create-user.component.html', // Archivo que define la estructura visual del componente.
  styleUrls: ['./modal-create-user.component.scss'] // Archivo que contiene los estilos específicos del componente.
})
export class ModalCreateUserComponent implements OnInit { // Definición del componente.

  formCreateUser!: FormGroup; // Formulario reactivo para la creación de usuarios.
  administratorsValue: any[] = []; // Almacena la lista de administradores disponibles.
  showFieldAdministrator: boolean = false; // Controla la visibilidad del campo de administrador.

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Recibe datos del diálogo cuando es abierto.
    private readonly _formBuilder: FormBuilder, // Servicio para construir formularios reactivos.
    private readonly _userService: UsersService, // Servicio para gestionar usuarios.
    private readonly _dialogRef: MatDialogRef<ModalCreateUserComponent>, // Referencia al diálogo para cerrarlo.
    private readonly _snackBar: MatSnackBar, // Servicio para mostrar notificaciones emergentes.
  ) {
    this.createFormUsers(); // Inicializa el formulario.
    
    // Agrega una validación para detectar cambios en el campo de confirmación de contraseña.
    this.formCreateUser.controls['confirmPassword'].valueChanges.pipe(
      debounceTime(1000), // Espera 1 segundo para evitar validaciones innecesarias en cada pulsación.
      distinctUntilChanged() // Solo ejecuta la validación si el valor realmente cambia.
    ).subscribe((value) => {
      this.validatePassword(value);
    });
  }

  ngOnInit(): void {
    this.getAllAdministrator(); // Obtiene la lista de administradores al inicializar el componente.
  }

  // Configura el formulario con sus validaciones iniciales.
  createFormUsers() {
    this.formCreateUser = this._formBuilder.group({
      nombre: ['', Validators.required], // Campo obligatorio.
      email: ['', Validators.required], // Campo obligatorio.
      password: ['', Validators.required], // Campo obligatorio.
      confirmPassword: ['', Validators.required], // Campo obligatorio.
      rol_id: ['', Validators.required], // Campo obligatorio.
      administrador_id: [undefined, Validators.required] // Campo obligatorio, se mostrará solo si el rol lo requiere.
    });
  }

  // Obtiene la lista de administradores desde el servicio de usuarios.
  getAllAdministrator() {
    this._userService.getAllAdministrator().subscribe({
      next: (res) => {
        this.administratorsValue = res.users;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // Maneja el cambio de rol para mostrar u ocultar el campo de administrador.
  onChangeRole(event: any) {
    if (event.value === '1') {
      this.hideAdministratorField();
    } else {
      this.showAdministratorField();
    }
  }

  // Envía el formulario para crear un nuevo usuario.
  onSubmit() {
    if (this.formCreateUser.invalid) { // Verifica si el formulario es válido.
      Swal.fire('Error', 'Por favor completa todos los campos', 'error');
      return;
    }

    const userDataInformation = {
      nombre: this.formCreateUser.get('nombre')?.value,
      email: this.formCreateUser.get('email')?.value,
      password: this.formCreateUser.get('password')?.value,
      rol_id: Number(this.formCreateUser.get('rol_id')?.value),
      administrador_id: this.formCreateUser.get('administrador_id')?.value
    };

    this._userService.createUser(userDataInformation).subscribe({
      next: (response) => {
        this._snackBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.formCreateUser.reset();
        this._dialogRef.close(true);
      },
      error: (error) => {
        const errorMessage = error.error?.result || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
        this._snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }

  // Valida que la confirmación de contraseña coincida con la contraseña original.
  private validatePassword(confirmPassword: string) {
    const password = this.formCreateUser.get('password')?.value;
    if (password !== confirmPassword) {
      this.formCreateUser.get('confirmPassword')?.setErrors({ invalid: true });
    } else {
      this.formCreateUser.get('confirmPassword')?.setErrors(null);
    }
  }

  private showAdministratorField() {
    this.showFieldAdministrator = true;
    this.formCreateUser.get('administrador_id')?.setValidators([Validators.required]);
    this.formCreateUser.get('administrador_id')?.updateValueAndValidity();
  }

  private hideAdministratorField() {
    this.showFieldAdministrator = false;
    this.formCreateUser.get('administrador_id')?.clearValidators();
    this.formCreateUser.get('administrador_id')?.setValue(undefined);
  }

}

