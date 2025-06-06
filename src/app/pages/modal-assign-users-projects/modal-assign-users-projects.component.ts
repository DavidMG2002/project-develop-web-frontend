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

//importa servicio de proyectos
import { ProjectService } from '../../services/projects/projects.service';

//importa libreria sweetalert para alertas visuales
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-assign-users-projects',
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
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatListModule,
    MatCheckboxModule,
  ],
  templateUrl: './modal-assign-users-projects.component.html',
  styleUrls: ['./modal-assign-users-projects.component.scss']
})
export class ModalAssignUsersProjectsComponent implements OnInit {
  formAssignUsers!: FormGroup;
  availableUsers: any[] = [];
  assignedUsers: any[] = [];
  projectData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _formBuilder: FormBuilder,
    private readonly _projectService: ProjectService,
    private readonly dialogRef: MatDialogRef<ModalAssignUsersProjectsComponent>,
    private readonly _snackBar: MatSnackBar,
  ) {
    this.projectData = data;
  }

ngOnInit(): void {
  this.createForm();
  this.loadAssignedUsers();
  // Cargar disponibles después de los asignados para filtrar correctamente
  setTimeout(() => {
    this.loadAvailableUsers();
  }, 100);
}
  createForm(): void {
    this.formAssignUsers = this._formBuilder.group({
      selectedUsers: [[]]
    });
  }

loadAvailableUsers(): void {
  // Cargar administradores disponibles para asignar al proyecto
  this._projectService.getAllAdministrator().subscribe({
    next: (res) => {
      console.log('Administradores disponibles:', res);
      // Filtrar administradores que no estén ya asignados al proyecto
      this.availableUsers = res.filter((admin: any) => 
        !this.assignedUsers.some((assigned: any) => assigned.id === admin.id)
      );
    },
    error: (err) => {
      console.error('Error al cargar administradores:', err);
      this._snackBar.open('Error al cargar administradores disponibles', 'Cerrar', { duration: 3000 });
    }
  });
}

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

  toggleUserSelection(user: any, isChecked: boolean): void {
    const currentSelection = this.formAssignUsers.get('selectedUsers')?.value || [];
    
    if (isChecked) {
      if (!currentSelection.includes(user.id)) {
        currentSelection.push(user.id);
      }
    } else {
      const index = currentSelection.indexOf(user.id);
      if (index > -1) {
        currentSelection.splice(index, 1);
      }
    }
    
    this.formAssignUsers.patchValue({
      selectedUsers: currentSelection
    });
  }

  isUserSelected(userId: number): boolean {
    const selectedUsers = this.formAssignUsers.get('selectedUsers')?.value || [];
    return selectedUsers.includes(userId);
  }

  onSubmit(): void {
    const selectedUserIds = this.formAssignUsers.get('selectedUsers')?.value || [];
    
    if (selectedUserIds.length === 0) {
      Swal.fire('Advertencia', 'Selecciona al menos un usuario para asignar', 'warning');
      return;
    }

    const assignmentData = {
      project_id: this.projectData.id,
      user_ids: selectedUserIds
    };
  }

  removeUserAssignment(userId: number): void {
    this._projectService.removeUserFromProject(this.projectData.id, userId).subscribe({
      next: (response) => {
        this._snackBar.open('Usuario removido del proyecto', 'Cerrar', { duration: 3000 });
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