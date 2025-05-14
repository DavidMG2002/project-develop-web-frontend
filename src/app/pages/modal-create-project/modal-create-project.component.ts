import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UsersService } from 'app/services/users/users.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-create-user',
  standalone: true,
  imports: [CommonModule,
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
  templateUrl: './modal-create-user.component.html',
  styleUrl: './modal-create-user.component.scss'
})
export class ModalCreateUserComponent implements OnInit {

  formCreateUser!: FormGroup;
  administratorsValues: any[] = [];
  showFieldAdministrator: boolean = false;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _formBuilder: FormBuilder,
    private readonly _userService: UsersService,
    private readonly dialogRef: MatDialogRef<ModalCreateUserComponent>,
    private readonly _sanckBar: MatSnackBar,
  )

  {
    this.createFormUsers();
    this.formCreateUser.controls['confirmPassword'].valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((value) => {
      this.validatePassword(value);
    });
  }

  ngOnInit(): void {
    this.getAllAdministrator();
  }
  
  createFormUsers() {
    this.formCreateUser = this._formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      rol_id: ['', Validators.required],
      administrador_id: [undefined, Validators.required]
    });
  }

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

  onChangeRole(event: any) {
    if (event.value === '1') {
      this.hideAdministratorField();
    } else {
      this.showAdministratorField();
    }
  }

  onSubmit() {
    if (this.formCreateUser.invalid) {
      Swal.fire('Error', 'Por favor completa los campos', 'error');
      return;
    }
    
    const userDataInformation = {
      nombre: this.formCreateUser.get('nombre')?.value,
      email: this.formCreateUser.get('email')?.value,
      password: this.formCreateUser.get('password')?.value,
      rol_id: Number(this.formCreateUser.get('nombre')?.value),
      adminitrador_id: this.formCreateUser.get('administrador_id')?.value
    };

    this._userService.createUser(userDataInformation).subscribe({
      next: (response) => {
        this._sanckBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.formCreateUser.reset();
        this.dialogRef.close(true);
      },
      error: (error) => {
        const errorMessage = error.error?.result || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
        this._sanckBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }

  private validatePassword(confirmPassword: string) { //contraseña de confirmacion coincide con la contraseña
    const password = this.formCreateUser.get('password')?.value;
    if (password !== confirmPassword) {
      this.formCreateUser.get('confirmPassword')?.setErrors({ invalid: true });
    } else {
      this.formCreateUser.get('confirmPAssword')?.setErrors(null);
    }

  }
  
  private showAdministratorField() { // Cuando el rol es diferente de 1, se muestra el campo de administrador 
    this.showFieldAdministrator = true;
    this.formCreateUser.get('administrador_id')?.setValidators([Validators.required]);
    this.formCreateUser.get('administrador_id')?.updateValueAndValidity();
  }

  private hideAdministratorField() { // Cuando el rol es 1, no se muestra el campo de administrador // no es requerido
    this.showFieldAdministrator = false;
    this.formCreateUser.get('administrador_id')?.clearValidators();
    this.formCreateUser.get('administrador_id')?.updateValueAndValidity();

  }

}

