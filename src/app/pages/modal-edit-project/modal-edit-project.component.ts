// Importación de módulos y librerías necesarias de Angular
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { 
  MatDialogModule, 
  MatDialogRef, 
  MatDialogClose, 
  MatDialogContent, 
  MatDialogTitle, 
  MatDialogActions,
  MAT_DIALOG_DATA 
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

// Importación del servicio para gestión de usuarios
import { UsersService } from 'app/services/users/users.service';

// Declaración del componente Angular
@Component({
  selector: 'app-modal-edit-users', // Nombre del selector del componente
  standalone: true, // Indica que el componente es independiente
  imports: [
    CommonModule, 
    FormsModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatIconModule,
    MatInputModule, 
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  templateUrl: './modal-edit-project.component.html', // Ruta de la plantilla HTML asociada
  styleUrls: ['./modal-edit-project.component.scss'] // Ruta de los estilos del componente
})
export class ModalEditUsersComponent {
  // Declaración del formulario reactivo
  formUpdateUsers!: FormGroup;
  
  // Lista de valores de administradores (puede usarse para asignación)
  administratorsValues: any[] = [];

  // Constructor con inyección de dependencias
  constructor(
    private fb: FormBuilder, // Constructor de formularios
    private usersService: UsersService, // Servicio de usuarios
    private snackBar: MatSnackBar, // Servicio para mostrar mensajes emergentes
    public dialogRef: MatDialogRef<ModalEditUsersComponent>, // Referencia al diálogo
    @Inject(MAT_DIALOG_DATA) public data: any // Datos inyectados al abrir el modal
  ) {
    this.initializeForm(); // Inicializa el formulario
    this.loadUserData(); // Carga los datos del usuario a editar
  }

  // Método para inicializar el formulario con validaciones
  private initializeForm(): void {
    this.formUpdateUsers = this.fb.group({
      name: ['', [Validators.required]], // Campo de nombre con validación requerida
      email: ['', [Validators.required, Validators.email]], // Campo de correo con validación de formato
      role: ['', [Validators.required]] // Campo de rol con validación requerida
    });
  }

  // Método para cargar los datos del usuario en el formulario
  private loadUserData(): void {
    if (this.data && this.data.user) {
      this.formUpdateUsers.patchValue({
        name: this.data.user.name || '', // Carga el nombre del usuario
        email: this.data.user.email || '', // Carga el correo del usuario
        role: this.data.user.role || '' // Carga el rol del usuario
      });
    }
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (this.formUpdateUsers.valid) {
      // Si el formulario es válido, se registra la actualización del usuario
      console.log('Form data:', this.formUpdateUsers.value);
      this.dialogRef.close(this.formUpdateUsers.value); // Cierra el diálogo y devuelve los datos
    } else {
      // Si el formulario es inválido, muestra un mensaje de error
      this.snackBar.open('Por favor, completa todos los campos requeridos', 'Cerrar', {
        duration: 3000
      });
    }
  }

  // Método para cancelar la edición y cerrar el modal sin cambios
  onCancel(): void {
    this.dialogRef.close();
  }
}
