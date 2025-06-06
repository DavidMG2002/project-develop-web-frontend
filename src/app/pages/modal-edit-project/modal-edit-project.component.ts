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
    MatInputModule, 
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  templateUrl: './modal-edit-project.component.html',
  styleUrls: ['./modal-edit-project.component.scss']
})
export class ModalEditUsersComponent {
  // Permite hacer uso del formulario reactivo
  formUpdateUsers!: FormGroup;
  
  // Representa el mismo formulario que tenía anteriormente para editarlo
  administratorsValues: any[] = [];

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ModalEditUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initializeForm();
    this.loadUserData();
  }

  private initializeForm(): void {
    this.formUpdateUsers = this.fb.group({
      // Agrega aquí los campos que necesites
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]]
    });
  }

  private loadUserData(): void {
    if (this.data && this.data.user) {
      this.formUpdateUsers.patchValue({
        name: this.data.user.name || '',
        email: this.data.user.email || '',
        role: this.data.user.role || ''
      });
    }
  }

  onSubmit(): void {
    if (this.formUpdateUsers.valid) {
      // Lógica para actualizar usuario
      console.log('Form data:', this.formUpdateUsers.value);
      this.dialogRef.close(this.formUpdateUsers.value);
    } else {
      this.snackBar.open('Por favor, completa todos los campos requeridos', 'Cerrar', {
        duration: 3000
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}