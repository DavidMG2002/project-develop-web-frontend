// Importación de módulos y librerías necesarias para la aplicación
import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Importación del servicio para gestionar proyectos
import { ProjectService } from '../../services/projects/projects.service';

// Importación de la librería SweetAlert para mostrar alertas visuales
import Swal from 'sweetalert2';

// Declaración del componente Angular
@Component({
  selector: 'app-modal-assign-users-projects', // Nombre del selector que identifica el componente
  standalone: true, // Define que el componente es independiente
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
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatListModule,
    MatCheckboxModule,
  ],
  templateUrl: './modal-assign-users-projects.component.html', // Ruta de la plantilla HTML asociada
  styleUrls: ['./modal-assign-users-projects.component.scss'] // Ruta de los estilos asociados
})
export class ModalAssignUsersProjectsComponent implements OnInit {
  // Declaración de variables del formulario y datos
  formAssignUsers!: FormGroup;
  availableUsers: any[] = []; // Lista de usuarios disponibles para asignar
  assignedUsers: any[] = []; // Lista de usuarios ya asignados al proyecto
  projectData: any; // Datos del proyecto obtenidos a través de inyección de dependencia

  // Constructor del componente con inyección de dependencias
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos pasados al componente a través de un diálogo de Angular Material
    private readonly _formBuilder: FormBuilder, // Utilizado para construir el formulario
    private readonly _projectService: ProjectService, // Servicio para gestionar operaciones relacionadas con proyectos
    private readonly dialogRef: MatDialogRef<ModalAssignUsersProjectsComponent>, // Referencia al diálogo de Angular Material
    private readonly _snackBar: MatSnackBar, // Servicio de Angular Material para mostrar notificaciones
  ) {
    this.projectData = data; // Se almacenan los datos del proyecto
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.createForm(); // Llamada al método para inicializar el formulario
    this.loadAssignedUsers(); // Carga los usuarios asignados al proyecto

    // Carga los usuarios disponibles después de los asignados para poder filtrarlos correctamente
    setTimeout(() => {
      this.loadAvailableUsers();
    }, 100);
  }

  // Método para inicializar el formulario
  createForm(): void {
    this.formAssignUsers = this._formBuilder.group({
      selectedUsers: [[]] // Define el campo selectedUsers como un array vacío al inicio
    });
  }

  // Método para cargar los usuarios disponibles para asignar al proyecto
  loadAvailableUsers(): void {
    this._projectService.getAllAdministrator().subscribe({
      next: (res) => {
        console.log('Administradores disponibles:', res);

        // Filtra los administradores que no estén ya asignados al proyecto
        this.availableUsers = res.filter((admin: any) => 
          !this.assignedUsers.some((assigned: any) => assigned.id === admin.id)
        );
      },
      error: (err) => {
        console.error('Error al cargar administradores:', err);
        // Muestra un mensaje de error en la interfaz usando MatSnackBar
        this._snackBar.open('Error al cargar administradores disponibles', 'Cerrar', { duration: 3000 });
      }
    });
  }

  // Método para cargar los usuarios ya asignados al proyecto
  loadAssignedUsers(): void {
    this._projectService.getAssignedUsers(this.projectData.id).subscribe({
      next: (res) => {
        console.log('Usuarios asignados:', res);
        this.assignedUsers = res;
      },
      error: (err) => {
        console.error('Error al cargar usuarios asignados:', err);
      }
    });
  }

  // Método para seleccionar o deseleccionar un usuario
  toggleUserSelection(user: any, isChecked: boolean): void {
    const currentSelection = this.formAssignUsers.get('selectedUsers')?.value || [];

    if (isChecked) {
      // Si el usuario no está en la lista de seleccionados, se agrega
      if (!currentSelection.includes(user.id)) {
        currentSelection.push(user.id);
      }
    } else {
      // Si el usuario está en la lista, se remueve
      const index = currentSelection.indexOf(user.id);
      if (index > -1) {
        currentSelection.splice(index, 1);
      }
    }
    
    // Se actualiza el formulario con los usuarios seleccionados
    this.formAssignUsers.patchValue({
      selectedUsers: currentSelection
    });
  }

  // Método para verificar si un usuario está seleccionado
  isUserSelected(userId: number): boolean {
    const selectedUsers = this.formAssignUsers.get('selectedUsers')?.value || [];
    return selectedUsers.includes(userId);
  }

  // Método para asignar los usuarios seleccionados al proyecto
  onSubmit(): void {
    const selectedUserIds = this.formAssignUsers.get('selectedUsers')?.value || [];

    if (selectedUserIds.length === 0) {
      // Muestra una advertencia con SweetAlert si no hay usuarios seleccionados
      Swal.fire('Advertencia', 'Selecciona al menos un usuario para asignar', 'warning');
      return;
    }

    const assignmentData = {
      project_id: this.projectData.id,
      user_ids: selectedUserIds
    };

    // Aquí iría la lógica para asignar los usuarios al proyecto (pendiente de implementación)
  }

  // Método para remover un usuario asignado del proyecto
  removeUserAssignment(userId: number): void {
    this._projectService.removeUserFromProject(this.projectData.id, userId).subscribe({
      next: (response) => {
        this._snackBar.open('Usuario removido del proyecto', 'Cerrar', { duration: 3000 });
        // Recarga las listas de usuarios después de la eliminación
        this.loadAssignedUsers();
        this.loadAvailableUsers();
      },
      error: (error) => {
        const errorMessage = error.error?.message || 'Error al remover usuario';
        this._snackBar.open(errorMessage, 'Cerrar', { duration: 3000 });
      }
    });
  }
}
