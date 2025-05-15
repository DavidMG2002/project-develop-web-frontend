//este modal es para editar un usuario existente en la aplicacion, contiene el formulario y la logica para enviar los datos al servidor
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'app/services/users/users.service';

@Component({
  selector: 'app-modal-edit-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule
  ],
  templateUrl: './modal-edit-users.component.html',
  styleUrls: ['./modal-edit-users.component.scss']
})
// ModalEditUsersComponent es una clase que representa el componente de edición de usuarios
export class ModalEditUsersComponent {
  formUpdateUsers!: FormGroup;
  administratorsValues: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _formBuilder: FormBuilder,
    private readonly _snackBar: MatSnackBar,
    private readonly _userService: UsersService,
    private readonly dialogRef: MatDialogRef<ModalEditUsersComponent>
  ) {
    // Inicializa el formulario de edición de usuario
    this.updateFormUsers();
    this.getAllAdministrator();
  }

  //sirve para inicializar el formulario de edición de usuario
  ngOnInit() {
    if (this.data?.user) {
      this.loadUserData(this.data.user);
    }
  }

  // createFormUsers es un método que crea el formulario de creación de usuario
  updateFormUsers() {
    this.formUpdateUsers = this._formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol_id: ['', Validators.required],
      administrador_id: ['', Validators.required]
    });
  }

  // Este método se utiliza para cargar los datos del usuario en el formulario de edición
  loadUserData(user: any) {
    this.formUpdateUsers.patchValue({
      nombre: user.nombre,
      email: user.email,
      rol_id: String(user.rol_id),
      administrador_id: user.administrador_id
    });
  }

  // getAllAdministrator es un método que obtiene todos los administradores del sistema
  getAllAdministrator() {
    this._userService.getAllAdministrator().subscribe({
      next: (res) => {
        this.administratorsValues = res.users;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // updateUsers es un método que se ejecuta cuando se envía el formulario de edición de usuario
  // Este método envía los datos del formulario al servidor para actualizar el usuario
  updateUsers() {
    if (this.formUpdateUsers.valid) {
      const userData = this.formUpdateUsers.value;
      const userId = this.data?.user?.id;

      this._userService.updateUser(userId, userData).subscribe({
        next: (response) => {
          this._snackBar.open(response.message, 'Cerrar', { duration: 5000 });
          this.dialogRef.close(true);
        },
        error: (error) => {
          const errorMessage = error.error?.result || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
          this._snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
        }
      });
    }
  }

}

